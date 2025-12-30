-- Add attachments column to store file metadata as JSON
ALTER TABLE public.contact_submissions 
ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;

-- Add comment to explain the column
COMMENT ON COLUMN public.contact_submissions.attachments IS 'Stores attachment metadata as JSON array with filename and content (base64)';
