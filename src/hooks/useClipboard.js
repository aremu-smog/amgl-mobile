import { useCallback } from "react"
import { useToast } from "./useToast"
import * as Clipboard from "expo-clipboard"

export const useClipboard = () => {
	const { showToast } = useToast()
	/**
	 *
	 * @param {string} text
	 */
	const copyToClipboard = useCallback(async text => {
		try {
			await Clipboard.setStringAsync(text)
			showToast("Link copied!", 2000)
		} catch (e) {
			showToast("Unable to copy link", 2000)
		}
	}, [])

	return {
		copyToClipboard,
	}
}
