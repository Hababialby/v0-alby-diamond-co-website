-- Add status columns for starred and archived submissions
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS starred BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_starred ON public.contact_submissions(starred);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_archived ON public.contact_submissions(archived);
