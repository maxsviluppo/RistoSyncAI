import React, { useState } from 'react';
import { CheckCircle, ShieldCheck, ArrowRight, Lock, ChefHat, Pizza, Sandwich, Bike, Zap, LayoutGrid, Award, Star, Settings } from 'lucide-react';
import { RestaurantProfile, AppSettings, Department } from '../types';

interface SubscriptionSuccessPageProps {
    planType: string;
    onStart: () => void;
    onSaveDepartment: (dept: Department) => void;
    restaurantName: string;
    showDepartmentSelector: boolean;
}

const SubscriptionSuccessPage: React.FC<SubscriptionSuccessPageProps> = ({
    planType,
    onStart,
    onSaveDepartment,
    restaurantName,
    showDepartmentSelector
}) => {
    const [selectedDept, setSelectedDept] = useState<Department | null>(null);

    const isBasic = planType === 'Basic';

    const handleConfirmDept = () => {
        if (selectedDept) {
            onSaveDepartment(selectedDept);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-y-auto custom-scroll relative">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none" />
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6 ring-1 ring-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
                        Congratulazioni, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{restaurantName}!</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Il tuo piano <span className="font-bold text-white uppercase bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{planType}</span> è ora attivo.
                        Hai sbloccato tutte le funzionalità professionali di RistoSync AI.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* Feature Highlights */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Star className="text-yellow-500 fill-yellow-500" />
                            Cosa puoi fare ora
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <LayoutGrid className="text-blue-400" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Gestione Completa</h4>
                                    <p className="text-sm text-slate-400 mt-1">Accedi al pannello di controllo per gestire menu, ordini e statistiche.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Zap className="text-purple-400" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">AI Automation</h4>
                                    <p className="text-sm text-slate-400 mt-1">Sfrutta l'intelligenza artificiale per migliorare le descrizioni dei piatti e analizzare le vendite.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <Settings className="text-orange-400" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Configurazione Personalizzata</h4>
                                    <p className="text-sm text-slate-400 mt-1">Imposta stampanti, reparti e preferenze del locale.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Plan Selector OR Pro Features */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                        {showDepartmentSelector ? (
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Lock className="text-blue-500" />
                                        Configura Reparto
                                    </h3>
                                    <p className="text-slate-400 text-sm mt-2">
                                        Il piano Basic include l'accesso a <strong>un solo reparto</strong> di produzione (+ Sala). Scegli con attenzione, la scelta è definitiva.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 mb-6 flex-1">
                                    {(['Cucina', 'Pizzeria', 'Pub'] as Department[]).map((dept) => {
                                        let Icon = ChefHat;
                                        if (dept === 'Pizzeria') Icon = Pizza;
                                        if (dept === 'Pub') Icon = Sandwich;

                                        const isSelected = selectedDept === dept;

                                        return (
                                            <button
                                                key={dept}
                                                onClick={() => setSelectedDept(dept)}
                                                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${isSelected
                                                        ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                                        : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-300'}`}>{dept}</span>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-600'}`}>
                                                    {isSelected && <CheckCircle size={14} className="text-white" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 h-full flex flex-col justify-center text-center p-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-orange-500/20 rotate-3">
                                    <Award size={40} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Accesso Illimitato</h3>
                                <p className="text-slate-400">
                                    Con il piano {planType}, hai accesso a tutti i reparti e funzionalità illimitate. Non è necessaria alcuna configurazione aggiuntiva.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {showDepartmentSelector && !selectedDept ? (
                        <p className="text-slate-500 mb-4 animate-pulse">Seleziona un reparto per continuare</p>
                    ) : (
                        <p className="text-slate-400 mb-6">Tutto è pronto. Entra nel tuo ristorante digitale.</p>
                    )}

                    <button
                        onClick={showDepartmentSelector ? handleConfirmDept : onStart}
                        disabled={showDepartmentSelector && !selectedDept}
                        className={`group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-lg tracking-wide shadow-2xl shadow-blue-600/30 transition-all ${(showDepartmentSelector && !selectedDept)
                                ? 'opacity-50 grayscale cursor-not-allowed'
                                : 'hover:scale-105 hover:shadow-blue-600/50 active:scale-95'
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {showDepartmentSelector ? 'CONFERMA E INIZIA' : 'VAI ALLA DASHBOARD'}
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                    </button>
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center text-slate-600 text-sm">
                    <p>© 2025 RistoSync AI. Per supporto contattaci a info@ristosyncai.it</p>
                </div>

            </div>
        </div>
    );
};

export default SubscriptionSuccessPage;
