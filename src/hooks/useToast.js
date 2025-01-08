import { useCallback } from "react"
import { useOS } from "./useOS"
import { ToastAndroid } from "react-native"

export const useToast = () => {
	const { isAndroid } = useOS()
	const showToast = useCallback((message, duration) => {
		// TODO: Implement a cross-platform toast solution
		if (isAndroid) {
			ToastAndroid.show(message, duration)
		}
	}, [])

	return {
		showToast,
	}
}
