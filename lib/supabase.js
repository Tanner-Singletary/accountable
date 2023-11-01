import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bxfruloupumcvynxnqnt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZnJ1bG91cHVtY3Z5bnhucW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMTUyNzIsImV4cCI6MjAxMzU5MTI3Mn0.m6EPHp4wxq7GdWTJjjrdDQaD8uH2oWRWr1Sas4cwq1k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});