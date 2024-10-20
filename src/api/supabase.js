import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL, SUPABASE_KEY } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
