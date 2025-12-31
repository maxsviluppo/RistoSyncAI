-- TABELLA CATEGORIE SPESE
CREATE TABLE IF NOT EXISTS public.expense_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DATI DI DEFAULT
INSERT INTO public.expense_categories (name, color) VALUES
('Alimentari', '#22c55e'),
('Bevande', '#3b82f6'),
('Utenze', '#eab308'),
('Personale', '#ef4444'),
('Manutenzione', '#f97316'),
('Marketing', '#a855f7'),
('Affitto', '#64748b'),
('Altro', '#94a3b8')
ON CONFLICT DO NOTHING;

-- TABELLA SPESE
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID, -- Lasciamo opzionale o non strict check se categories non matchano subito
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method TEXT NOT NULL, -- cash, card, bank_transfer
    deduct_from TEXT DEFAULT 'cassa', -- cassa, acconti
    receipt_url TEXT,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABELLA CHIUSURE GIORNALIERE (ESTRATTO CONTO / CASSA)
CREATE TABLE IF NOT EXISTS public.daily_closures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    total_sales NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_expenses NUMERIC(10, 2) NOT NULL DEFAULT 0,
    start_cash NUMERIC(10, 2) NOT NULL DEFAULT 0,
    end_cash NUMERIC(10, 2) NOT NULL DEFAULT 0,
    actual_cash NUMERIC(10, 2), -- Conteggio reale
    difference NUMERIC(10, 2), -- Ammanco/Eccedenza
    notes TEXT,
    closed_at TIMESTAMPTZ DEFAULT NOW(),
    closed_by UUID REFERENCES auth.users(id)
);

-- RLS
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_closures ENABLE ROW LEVEL SECURITY;

-- Policies (Permissive per sviluppo)
DROP POLICY IF EXISTS "Enable all access for all users" ON public.expense_categories;
CREATE POLICY "Enable all access for all users" ON public.expense_categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for all users" ON public.expenses;
CREATE POLICY "Enable all access for all users" ON public.expenses FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for all users" ON public.daily_closures;
CREATE POLICY "Enable all access for all users" ON public.daily_closures FOR ALL USING (true) WITH CHECK (true);
