import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { createClient } from "@supabase/supabase-js"
// import { SUPABASE_KEY } from "@env"

const supabaseUrl = "https://aytpjrurgknnvunschbn.supabase.co"
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

const ExpoSecureStoreAdapter = {
	getItem: key => {
		return SecureStore.getItemAsync(key)
	},
	setItem: (key, value) => {
		SecureStore.setItemAsync(key, value)
	},
	removeItem: key => {
		SecureStore.deleteItemAsync(key)
	},
}
export const supabaseApp = createClient(supabaseUrl, supabaseKey, {
	auth: {
		storage: ExpoSecureStoreAdapter,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
