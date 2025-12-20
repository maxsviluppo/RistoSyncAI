
# Guida alla Configurazione: Facebook & Instagram API Token

Per abilitare la pubblicazione reale su Facebook e Instagram dal tuo gestionale RistoSync, devi ottenere un **Page Access Token**. Questa guida ti mostra come ottenerli tramite il portale sviluppatori di Facebook.

## 1. Crea un'App su Facebook Developers

1. Vai su [developers.facebook.com](https://developers.facebook.com) e accedi con il tuo account Facebook (quello amministratore della Pagina/Instagram).
2. Clicca su **Le mie app** -> **Crea app**.
3. Seleziona **Altro** (o "Business") come tipo di app.
4. Completa i dettagli (Nome app, email contatto) e crea l'app.

## 2. Aggiungi i Prodotti necessari

Nella dashboard della tua nuova app, aggiungi questi prodotti:

1.  **Facebook Login for Business** (o solo "Facebook Login").
    *   Configura le impostazioni (puoi lasciare default per ora se usi solo token manuali).
2.  **Instagram Graph API** (se vuoi pubblicare su Instagram).

## 3. Ottieni un Token Utente (Graph API Explorer)

Il metodo più veloce per ottenere un token senza scrivere codice backend è usare il **Graph API Explorer**.

1.  Vai su [Strumenti -> Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2.  Assicurati che **Meta App** in alto a destra sia l'app che hai appena creato.
3.  In "User or Page", seleziona **User Token**.
4.  In "Permissions", aggiungi queste permission fondamentali:
    *   `pages_manage_posts`
    *   `pages_read_engagement`
    *   `instagram_basic`
    *   `instagram_content_publish`
5.  Clicca **Generate Access Token**.
6.  Segui il popup di login di Facebook e "Autorizza" l'app per le tue Pagine e Account Instagram.

## 4. Ottieni il Page Access Token (Token Lunga Durata)

Il token utente ottenuto sopra scade dopo 1 ora. Devi convertirlo in un **Token Pagina** a lunga durata.

1.  Sempre nel Graph API Explorer, cambia il metodo da `GET` a `GET` (default).
2.  Inserisci nel campo query: `me/accounts?fields=name,access_token`.
3.  Clicca **Submit**.
4.  Nel JSON di risposta, cerca la tua Pagina. Copia il valore `access_token` che trovi accanto al nome della tua pagina.
    *   *Nota: Questo è il token della pagina che non scade mai (a meno che non cambi password o revochi i permessi).*
5.  Copia anche l'`id` della pagina.

## 5. Inserisci i dati in RistoSync

1.  Apri RistoSync -> Marketing -> **Connetti Account**.
2.  Clicca su **"Ho già un Token API (Configurazione Avanzata)"**.
3.  Incolla il **Page ID** e il **Page Access Token** copiati al punto 4.
4.  Clicca **Salva e Connetti**.

---

### Per Instagram

Se vuoi pubblicare su Instagram, assicurati che l'account Instagram sia collegato alla tua Pagina Facebook.
Il Token che usi per la Pagina Facebook (se collegata) ti permette spesso di pubblicare anche su Instagram se hai le permission `instagram_content_publish`.

L'`Instagram Business Account ID` lo puoi trovare facendo una query nel Graph Explorer:
`me?fields=instagram_business_account` (usando il token della pagina).
