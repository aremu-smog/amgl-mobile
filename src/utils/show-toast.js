import { Platform, ToastAndroid } from "react-native"

/**
 *
 * @param {string} message
 * @param {number} duration
 */

export const showToast = (message, duration) => {
	if (Platform.OS === "android") {
		ToastAndroid.show(message, duration)
	}
}
