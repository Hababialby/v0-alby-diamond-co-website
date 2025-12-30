-- Create analytics table for visitor tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Page info
  page_path text NOT NULL,
  page_title text,
  referrer text,
  
  -- Visitor info
  visitor_id text NOT NULL, -- Client-generated persistent ID
  session_id text NOT NULL, -- Session identifier
  
  -- Device/Browser info
  user_agent text,
  device_type text, -- mobile, tablet, desktop
  browser text,
  os text,
  screen_width integer,
  screen_height integer,
  
  -- Location (from IP if available)
  country text,
  city text,
  
  -- Event type
  event_type text NOT NULL DEFAULT 'pageview', -- pageview, click, etc.
  event_data jsonb, -- Additional event data
  
  -- Performance metrics
  load_time integer -- Page load time in ms
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON public.analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON public.analytics_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);

-- Create a view for daily stats
CREATE OR REPLACE VIEW public.analytics_daily_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_pageviews,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(DISTINCT session_id) as total_sessions,
  AVG(load_time) as avg_load_time
FROM public.analytics_events
WHERE event_type = 'pageview'
GROUP BY DATE(created_at)
ORDER BY date DESC;
