# 🔧 Configurazione Stripe Payment Links - OBBLIGATORIA

## ⚠️ Senza questa configurazione il ritorno da Stripe NON funziona!

---

## Istruzioni Passo-Passo

### 1. Accedi a Stripe Dashboard
   - Vai su: https://dashboard.stripe.com/payment-links

### 2. Per OGNI Payment Link, fai così:

   a) Clicca sul link da modificare
   b) Vai nella sezione **"After payment"**
   c) Seleziona **"Don't show confirmation page"**
   d) Nel campo **"Redirect customers to your website"**, inserisci l'URL corretto:

| Piano | URL di Redirect |
|-------|-----------------|
| Basic Mensile | `https://www.ristosyncai.it/?subscription=success&plan=basic_monthly` |
| Basic Annuale | `https://www.ristosyncai.it/?subscription=success&plan=basic_yearly` |
| Pro Mensile | `https://www.ristosyncai.it/?subscription=success&plan=pro_monthly` |
| Pro Annuale | `https://www.ristosyncai.it/?subscription=success&plan=pro_yearly` |

### 3. Salva le modifiche su ogni Payment Link

---

## Test Locale (Senza Pagare)

Per verificare che l'app risponda correttamente, apri nel browser:

```
http://localhost:5173/?subscription=success&plan=basic_monthly
```

**Risultato atteso:**
- ✅ Modale "Congratulazioni" appare
- ✅ Toast verde di conferma
- ✅ Piano aggiornato in localStorage
- ✅ (Se Basic) Modale selezione reparto

---

## Note Importanti

- Gli URL devono essere ESATTAMENTE come indicati sopra
- Il parametro `plan` è fondamentale per identificare quale piano è stato acquistato
- Per test locali, sostituisci `https://www.ristosyncai.it` con `http://localhost:5173`
