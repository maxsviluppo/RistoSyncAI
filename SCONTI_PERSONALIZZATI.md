# 💰 Sistema Sconti Personalizzati - Super Admin

## ✨ Funzionalità Implementata

Ora puoi applicare **sconti personalizzati** a singoli utenti direttamente dal Super Admin Dashboard, senza modificare i prezzi globali.

## 🎯 Come Funziona

### 1. **Accesso alla Funzione**
- Login come Super Admin
- Apri il profilo di un utente (icona ingranaggio)
- Clicca "Modifica Dati"
- Scorri alla sezione "Stato Abbonamento"

### 2. **Tipi di Sconto Disponibili**

#### **Nessuno** (Default)
- L'utente paga il prezzo standard
- Nessuno sconto applicato

#### **Percentuale %**
- Sconto in percentuale sul prezzo
- Esempio: 10% → Se il piano costa 49€, paga 44.10€
- Utile per: Sconti promozionali, clienti fedeli

#### **Importo Fisso €**
- Sconto di un importo fisso
- Esempio: 5€ → Se il piano costa 49€, paga 44€
- Utile per: Offerte speciali, compensazioni

### 3. **Applicazione dello Sconto**

1. Seleziona il tipo di sconto dal menu a tendina
2. Inserisci il valore (es: "10" per 10%, o "5.00" per 5€)
3. Appare un'anteprima gialla: "✨ Sconto: 10% sul prezzo"
4. Clicca "Salva Tutto"
5. Lo sconto è attivo!

## 📊 Esempi Pratici

### Esempio 1: Sconto Percentuale
**Configurazione:**
- Piano: Mensile (49€)
- Sconto: 20% (Percentuale)

**Risultato:**
- Prezzo originale: 49€
- Sconto applicato: -9.80€ (20%)
- **Prezzo finale: 39.20€**

### Esempio 2: Sconto Fisso
**Configurazione:**
- Piano: Annuale (490€)
- Sconto: 50€ (Fisso)

**Risultato:**
- Prezzo originale: 490€
- Sconto applicato: -50€
- **Prezzo finale: 440€**

### Esempio 3: Nessuno Sconto
**Configurazione:**
- Piano: Mensile (49€)
- Sconto: Nessuno

**Risultato:**
- **Prezzo finale: 49€** (prezzo standard)

## 🔒 Sicurezza e Privacy

### ✅ Visibilità
- **Super Admin**: Vede e gestisce tutti gli sconti
- **Utente**: NON vede che ha uno sconto personalizzato
- **Utente**: Vede solo il prezzo finale nel campo "Costo"

### ✅ Persistenza
- Lo sconto viene salvato nel database
- Rimane attivo anche dopo logout/login
- Può essere modificato o rimosso in qualsiasi momento

### ✅ Non Invasivo
- Non modifica i prezzi globali
- Non influenza altri utenti
- Completamente trasparente per l'utente

## 🛠️ Dettagli Tecnici

### Struttura Dati
```typescript
customDiscount: {
    type: 'none' | 'percentage' | 'fixed',
    value: string  // es: "10" o "5.00"
}
```

### Salvataggio
- Salvato in: `profiles.settings.restaurantProfile.customDiscount`
- Formato: JSON object
- Aggiornamento: Tempo reale con `saveRegistryChanges()`

### Caricamento
- Caricato in: `openRegistry()` quando apri il profilo
- State management: `discountType` e `discountValue`
- Rendering condizionale: Solo in modalità modifica

## 📝 Note Importanti

1. **Lo sconto è privato**: L'utente non sa di avere uno sconto speciale
2. **Il campo "Costo" mostra il prezzo base**: Lo sconto non modifica il costo visualizzato
3. **Usa le Note Interne**: Per annotare il motivo dello sconto
4. **Compatibile con tutti i piani**: Trial, Mensile, Annuale, VIP, Free

## 🎨 Interfaccia Utente

### Posizione
- Sezione: "Stato Abbonamento"
- Dopo: Campo "Costo (€)"
- Prima: "Ultimo Accesso"

### Elementi
- **Label**: "✨ Sconto Personalizzato"
- **Select**: Tipo di sconto (Nessuno/Percentuale/Fisso)
- **Input**: Valore dello sconto (appare solo se tipo ≠ "Nessuno")
- **Anteprima**: Testo giallo con riepilogo sconto

### Visibilità
- Visibile SOLO in modalità modifica (`isEditingRegistry = true`)
- Nascosto quando si visualizza il profilo senza modificare

## 🚀 Casi d'Uso

### 1. Cliente VIP
- Sconto: 15% su tutti i piani
- Motivo: Cliente storico, fedeltà

### 2. Promozione Speciale
- Sconto: 10€ fisso sul primo mese
- Motivo: Campagna marketing

### 3. Compensazione
- Sconto: 20€ fisso
- Motivo: Disservizio, rimborso parziale

### 4. Partner/Affiliato
- Sconto: 30% permanente
- Motivo: Accordo commerciale

### 5. Test/Beta Tester
- Sconto: 50% per 6 mesi
- Motivo: Programma beta testing

## ✅ Checklist Utilizzo

- [ ] Login come Super Admin
- [ ] Apri profilo utente
- [ ] Clicca "Modifica Dati"
- [ ] Scorri a "Stato Abbonamento"
- [ ] Seleziona tipo sconto
- [ ] Inserisci valore
- [ ] Verifica anteprima gialla
- [ ] (Opzionale) Aggiungi nota in "Note Interne"
- [ ] Clicca "Salva Tutto"
- [ ] Verifica che lo sconto sia salvato

## 📁 File Modificati

- `components/SuperAdminDashboard.tsx`
  - Righe 43-46: State per discount
  - Righe 245-248: Caricamento discount
  - Righe 295-299: Salvataggio discount
  - Righe 751-789: UI gestione discount
