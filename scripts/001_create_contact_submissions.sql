-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  product_title TEXT,
  product_category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public contact form)
CREATE POLICY "Allow public to insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read all submissions (for admin)
CREATE POLICY "Allow service role to read all submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (true);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx 
  ON public.contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_email_idx 
  ON public.contact_submissions(email);
