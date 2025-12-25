// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const VERIFY_TOKEN = "ristosync_secure_token"; // Hardcoded for simplicity in this demo

console.log(`🚀 WhatsApp Webhook Function Started!`);

serve(async (req) => {
    const url = new URL(req.url);

    // --- 1. VERIFIC NODE (GET) ---
    // Meta chiama questo endpoint per verificare che il webhook esista e sia nostro
    if (req.method === "GET") {
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("✅ Webhook Verified!");
            return new Response(challenge, { status: 200 });
        } else {
            console.error("❌ Verification failed. Token mismatch.");
            return new Response("Forbidden", { status: 403 });
        }
    }

    // --- 2. EVENT NOTIFICATION (POST) ---
    // Meta invia qui i messaggi ricevuti e gli aggiornamenti di stato
    if (req.method === "POST") {
        try {
            const body = await req.json();
            console.log("📩 Incoming Webhook Event:", JSON.stringify(body, null, 2));

            // Qui in futuro potremo gestire:
            // - Messaggi in arrivo -> Salvarli nel DB
            // - Stato messaggi (consegnato/letto) -> Aggiornare UI

            // Esempio struttura semplificata
            if (body.object === "whatsapp_business_account") {
                body.entry?.forEach((entry: any) => {
                    entry.changes?.forEach((change: any) => {
                        const value = change.value;

                        // Messaggio ricevuto
                        if (value.messages && value.messages.length > 0) {
                            const msg = value.messages[0];
                            console.log(`💬 Messaggio da ${msg.from}: ${msg.text?.body}`);
                        }

                        // Aggiornamento stato
                        if (value.statuses && value.statuses.length > 0) {
                            const status = value.statuses[0];
                            console.log(`zz Stato messaggio ${status.id}: ${status.status}`);
                        }
                    });
                });
            }

            return new Response("EVENT_RECEIVED", { status: 200 });
        } catch (e) {
            console.error("⚠️ Error processing webhook:", e);
            return new Response("Error", { status: 400 });
        }
    }

    return new Response("Method Not Allowed", { status: 405 });
});
