import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, Crown, Zap, Trophy, ChefHat, Pizza, Wine, Bike, Store, Rocket } from 'lucide-react';

interface SubscriptionSuccessModalProps {
    onClose: () => void;
    onAcknowledge: (selectedDepartment?: string) => void;
    planType: string; // 'Basic' or 'Pro'
    endDate: string;
    price: string;
    restaurantName: string;
}

const SubscriptionSuccessModal: React.FC<SubscriptionSuccessModalProps> = ({
    onClose,
    onAcknowledge,
    planType,
    endDate,
    price,
    restaurantName
}) => {
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const isBasicPlan = planType === 'Basic';

    const canProceed = !isBasicPlan || selectedDepartment !== null;

    const handleAcknowledge = () => {
        if (canProceed) {
            onAcknowledge(selectedDepartment || undefined);
        }
    };

    const departments = [
        { id: 'kitchen', label: 'Cucina', icon: ChefHat, color: 'from-green-600 to-emerald-600' },
        { id: 'pizzeria', label: 'Pizzeria', icon: Pizza, color: 'from-yellow-600 to-orange-600' },
        { id: 'pub', label: 'Pub', icon: Wine, color: 'from-purple-600 to-pink-600' },
        { id: 'delivery', label: 'Delivery', icon: Bike, color: 'from-blue-600 to-cyan-600' }
    ];

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in font-sans">
            <div className="bg-slate-900 border-2 border-orange-500/30 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-slide-up relative">
                {/* HEADER */}
                <div className={`relative bg-gradient-to-br ${planType === 'Pro' ? 'from-purple-600 via-indigo-700 to-blue-800' : 'from-orange-600 via-red-600 to-pink-700'} p-10 pb-12 rounded-t-[2.5rem] text-center overflow-hidden`}>
                    {/* Background Effects */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>

                    <div className="absolute top-6 right-6 z-20">
                        <button
                            onClick={onClose}
                            className="p-3 bg-black/20 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                            title="Chiudi"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 animate-bounce">
                            {planType === 'Pro' ? (
                                <Crown size={48} className="text-yellow-300 drop-shadow-md" />
                            ) : (
                                <Zap size={48} className="text-white drop-shadow-md" />
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-xl tracking-tight">
                            Benvenuto!
                        </h1>

                        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/10 shadow-lg">
                            <Store size={18} className="text-white/80" />
                            <span className="text-lg font-bold text-white tracking-wide uppercase">{restaurantName}</span>
                        </div>

                        <p className="text-white/90 text-xl font-medium max-w-md mx-auto leading-relaxed">
                            Congratulazioni, hai attivato con successo il Piano <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded-lg">{planType.toUpperCase()}</span>
                        </p>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="px-8 py-8 space-y-8 -mt-6 relative z-20 bg-slate-900 rounded-t-[2.5rem]">

                    {/* SUBSCRIPTION DETAILS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
                            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Scadenza</p>
                            <p className="text-white font-mono font-bold text-sm">{formatDate(endDate)}</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
                            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Prezzo</p>
                            <p className="text-white font-mono font-bold text-sm">€{price}/mo</p>
                        </div>
                    </div>

                    {/* PLAN FEATURES */}
                    <div className="space-y-4">
                        <h3 className="text-white font-black text-xl flex items-center gap-2">
                            <Rocket size={24} className={planType === 'Pro' ? 'text-purple-500' : 'text-orange-500'} />
                            I tuoi Nuovi Vantaggi
                        </h3>
                        <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-6">
                            <ul className="space-y-4">
                                {planType === 'Pro' ? (
                                    <>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-green-500/20 p-1.5 rounded-full"><CheckCircle size={18} className="text-green-500" /></div>
                                            <div><strong className="text-white block text-lg">Tutti i Reparti Sbloccati</strong><span className="text-slate-400 text-sm">Accesso illimitato a Cucina, Pizzeria, Pub e Delivery.</span></div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-green-500/20 p-1.5 rounded-full"><CheckCircle size={18} className="text-green-500" /></div>
                                            <div><strong className="text-white block text-lg">Marketing & AI</strong><span className="text-slate-400 text-sm">WhatsApp marketing e analisi avanzate inclusi.</span></div>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-green-500/20 p-1.5 rounded-full"><CheckCircle size={18} className="text-green-500" /></div>
                                            <div><strong className="text-white block text-lg">1 Reparto a Scelta</strong><span className="text-slate-400 text-sm">Scegli tra Cucina, Pizzeria, Pub o Delivery.</span></div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-green-500/20 p-1.5 rounded-full"><CheckCircle size={18} className="text-green-500" /></div>
                                            <div><strong className="text-white block text-lg">Menu Digitale Incluso</strong><span className="text-slate-400 text-sm">QR code e menu online per i tuoi clienti.</span></div>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* DEPARTMENT SELECTOR FOR BASIC PLAN */}
                    {isBasicPlan && (
                        <div className="bg-slate-800 border-2 border-blue-500/50 rounded-3xl p-6 shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            <h3 className="text-white font-black text-xl mb-2 flex items-center gap-2 relative z-10">
                                <Zap size={24} className="text-blue-400 fill-blue-400" />
                                Scelta Reparto
                            </h3>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10">
                                Il Piano Basic include <strong>un solo reparto</strong> attivo. Seleziona quale vuoi utilizzare:
                            </p>

                            <div className="grid grid-cols-2 gap-3 relative z-10">
                                {departments.map((dept) => {
                                    const Icon = dept.icon;
                                    const isSelected = selectedDepartment === dept.id;

                                    return (
                                        <button
                                            key={dept.id}
                                            onClick={() => setSelectedDepartment(dept.id)}
                                            className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${isSelected
                                                ? `bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/30 scale-105 z-20`
                                                : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800 opacity-80 hover:opacity-100'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-sm">
                                                    <CheckCircle size={16} className="text-white" />
                                                </div>
                                            )}
                                            <Icon size={32} className={isSelected ? 'text-white' : 'text-slate-400'} />
                                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                {dept.label}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            {!selectedDepartment && (
                                <div className="mt-6 text-center animate-pulse">
                                    <p className="text-blue-300 text-xs font-bold uppercase tracking-wider">
                                        Seleziona un'opzione per continuare
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ACTION BUTTON */}
                    <div className="pt-4 pb-4">
                        <button
                            onClick={handleAcknowledge}
                            disabled={!canProceed}
                            className={`w-full py-5 rounded-2xl font-black text-xl tracking-wide transition-all shadow-xl flex items-center justify-center gap-3 ${canProceed
                                ? `bg-gradient-to-r ${planType === 'Pro' ? 'from-purple-600 via-indigo-600 to-blue-600 hover:scale-[1.02]' : 'from-orange-500 via-red-600 to-pink-600 hover:scale-[1.02]'} text-white`
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            {canProceed ? (
                                <>
                                    🚀 INIZIA A LAVORARE
                                </>
                            ) : (
                                <>
                                    SELEZIONA UN REPARTO
                                </>
                            )}
                        </button>
                        {isBasicPlan && !selectedDepartment && (
                            <p className="text-center text-xs text-slate-500 mt-2 font-medium">
                                * Potrai cambiare piano in qualsiasi momento
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccessModal;
