import "react-native-url-polyfill/auto"
import { createClient } from "@supabase/supabase-js"
// import { SUPABASE_KEY } from "@env"

const supabaseUrl = "https://yscprznehevulantlliu.supabase.co"
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
export const supabaseApp = createClient(supabaseUrl, supabaseKey)
