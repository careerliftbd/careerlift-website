import { createClient } from '@supabase/supabase-js';

// .env ফাইল থেকে সরাসরি ডেটা রিড করা হচ্ছে (কোনো হার্ডকোড স্ট্রিং নেই)
const LMS_SUPABASE_URL = import.meta.env.VITE_LMS_SUPABASE_URL;
const LMS_SUPABASE_ANON_KEY = import.meta.env.VITE_LMS_SUPABASE_ANON_KEY;

// LMS ডাটাবেসের জন্য দ্বিতীয় কানেকশন তৈরি
export const lmsSupabase = createClient(LMS_SUPABASE_URL, LMS_SUPABASE_ANON_KEY);