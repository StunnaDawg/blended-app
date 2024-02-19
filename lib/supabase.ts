import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bgcwyrsjdxomqrmtgtcu.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnY3d5cnNqZHhvbXFybXRndGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyNzM4NTgsImV4cCI6MjAyMzg0OTg1OH0.hsRwK8Y8I2mDb6rdDSQi-KCBKNKAmMo310dhkHYd3CU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
