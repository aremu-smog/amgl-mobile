import { Platform } from "react-native"

export const useOS = () => {
	const isAndroid = Platform.OS === "android"
	const isIOS = Platform.OS === "ios"

	return {
		isAndroid,
		isIOS,
	}
}
