// Stripe Success Handler
// Gestisce il ritorno da Stripe dopo un pagamento completato

import { useEffect } from 'react';
import { supabase } from '../services/supabase';
import { getAppSettings, saveAppSettings } from '../services/storageService';

interface StripeSuccessHandlerProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
    session: any;
}

export const handleStripeSuccess = async (
    sessionId: string | null,
    plan: string | null,
    userId: string,
    userEmail: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    try {
        if (!plan) {
            onError('Piano non specificato');
            return;
        }

        // Determina il piano e la durata
        let planType: string;
        let months: number;
        let price: string;

        if (plan === 'basic_monthly') {
            planType = 'Basic';
            months = 1;
            price = '€49.90';
        } else if (plan === 'basic_yearly') {
            planType = 'Basic_Annuale';
            months = 12;
            price = '€499.00';
        } else if (plan === 'pro_monthly') {
            planType = 'Pro';
            months = 1;
            price = '€99.90';
        } else if (plan === 'pro_yearly') {
            planType = 'Pro_Annuale';
            months = 12;
            price = '€999.00';
        } else {
            onError('Piano non riconosciuto');
            return;
        }

        // Calcola data di scadenza
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        const endDateISO = endDate.toISOString();

        // Aggiorna il profilo utente su Supabase
        if (supabase) {
            const { data: currentProfile } = await supabase
                .from('profiles')
                .select('settings')
                .eq('id', userId)
                .single();

            const updatedSettings = {
                ...currentProfile?.settings,
                restaurantProfile: {
                    ...currentProfile?.settings?.restaurantProfile,
                    planType: planType,
                    subscriptionEndDate: endDateISO,
                    subscriptionCost: price,
                    lastPaymentDate: new Date().toISOString(),
                    paymentMethod: 'stripe',
                    stripeSessionId: sessionId || undefined,
                }
            };

            await supabase
                .from('profiles')
                .update({
                    settings: updatedSettings,
                    subscription_status: 'active'
                })
                .eq('id', userId);

            // Aggiorna anche localStorage
            const localSettings = getAppSettings();
            localSettings.restaurantProfile = {
                ...localSettings.restaurantProfile,
                planType: planType,
                subscriptionEndDate: endDateISO,
                subscriptionCost: price,
            };
            saveAppSettings(localSettings);
        }

        // Invia email di conferma al cliente
        await sendConfirmationEmail(userEmail, planType, price, endDateISO);

        // Invia notifica all'admin
        await sendAdminNotification(userEmail, planType, price, sessionId);

        // Messaggio di successo
        const successMessage = `🎉 Pagamento completato! Piano ${planType} attivato fino al ${new Date(endDateISO).toLocaleDateString('it-IT')}`;
        onSuccess(successMessage);

        // Rimuovi i parametri dall'URL
        window.history.replaceState({}, '', window.location.pathname);

    } catch (error) {
        console.error('Error handling Stripe success:', error);
        onError('Errore durante l\'attivazione del piano. Contatta l\'assistenza.');
    }
};

// Invia email di conferma al cliente
const sendConfirmationEmail = async (
    email: string,
    plan: string,
    price: string,
    endDate: string
) => {
    try {
        if (!supabase) return;

        // Crea un messaggio per il cliente
        const message = `
Gentile Cliente,

Il tuo pagamento è stato completato con successo! 🎉

Dettagli abbonamento:
- Piano: ${plan}
- Importo: ${price}
- Valido fino al: ${new Date(endDate).toLocaleDateString('it-IT')}

Puoi iniziare subito ad utilizzare tutte le funzionalità del tuo piano.

Grazie per aver scelto RistoSync!

Il Team RistoSync
info@ristosyncai.it
        `.trim();

        // Salva il messaggio nella tabella messages (se esiste)
        // Oppure usa un servizio email esterno
        console.log('Email di conferma da inviare a:', email);
        console.log(message);

        // TODO: Integrare con servizio email (SendGrid, Resend, ecc.)

    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

// Invia notifica all'admin
const sendAdminNotification = async (
    customerEmail: string,
    plan: string,
    price: string,
    sessionId: string | null
) => {
    try {
        if (!supabase) return;

        const message = `
🎉 NUOVO PAGAMENTO RICEVUTO

Cliente: ${customerEmail}
Piano: ${plan}
Importo: ${price}
Stripe Session: ${sessionId || 'N/A'}
Data: ${new Date().toLocaleString('it-IT')}
        `.trim();

        // Invia messaggio all'admin via Supabase
        await supabase.from('messages').insert({
            sender_id: 'system',
            recipient_id: null, // Broadcast
            subject: '💰 Nuovo Pagamento Stripe',
            content: message,
            is_read: false,
            created_at: new Date().toISOString(),
        });

        console.log('Notifica admin inviata');

    } catch (error) {
        console.error('Error sending admin notification:', error);
    }
};

export default handleStripeSuccess;
