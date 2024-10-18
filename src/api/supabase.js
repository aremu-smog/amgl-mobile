import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL, SUPABASE_KEY } from "@env"

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
export const supabaseApp = createClient(SUPABASE_URL, SUPABASE_KEY, {
	auth: {
		storage: ExpoSecureStoreAdapter,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
