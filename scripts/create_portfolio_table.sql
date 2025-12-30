-- Create portfolio items table in Supabase
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  customer_quote TEXT,
  customer_name TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_items(category);

-- Create index for faster ordering
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON public.portfolio_items(created_at DESC);
