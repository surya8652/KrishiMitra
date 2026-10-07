import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://eioiylkjyflldefltrbf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpb2l5bGtqeWZsbGRlZmx0cmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwODI0OTcsImV4cCI6MjEwNjY1ODQ5N30.VwuUmmsPZ44o7bvJ9PuaPMhnCl_kt4hXpGNEUakWEJc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
