import { createClient } from '@supabase/supabase-js';

// Vite এর import.meta.env ব্যবহার করে .env ফাইল থেকে ডেটা ফেচ করা হচ্ছে
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);