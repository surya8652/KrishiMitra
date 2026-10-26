import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gszpfuzbuowtpztevyst.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzenBmdXpidW93dHB6dGV2eXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MzcyNjMsImV4cCI6MjEwODMxMzI2M30.EjRi4ujnr8V1zO5xRTw-lX7me7cNm9nl6SKYiakBoLg';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
