import { useCallback } from "react"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"

import { supabaseApp } from "../../../api/supabase"
import { useAuthContext } from "../../../context/auth.context"

/**
 * @typedef {Object} Response
 * @property {Function} enablePushNotification
 *
 * @returns {Response}
 */
export const useEnablePushNotification = () => {
	const { setUser } = useAuthContext()

	const enablePushNotification = useCallback(() => {
		registerForPushNotificationsAsync().then(async token => {
			try {
				const { data, error } = await supabaseApp
					.from("push_notifications")
					.insert({
						user_id,
						expo_token: token,
					})
					.select()

				if (data) {
					const { data, error } = await supabaseApp
						.from("user_alias")
						.update({
							push_notification_enabled: true,
						})
						.eq("user_id", user_id)
						.select()
					if (data) {
						setUser(prevUser => {
							return { ...prevUser, push_notification_enabled: true }
						})
					}

					Alert.alert("Push Notification Enabled")
				}

				if (error) {
					console.error(error.message)
				}
			} catch (e) {
				console.error(e.message)
			}
		})
	}, [setUser])

	return {
		enablePushNotification,
	}
}

async function registerForPushNotificationsAsync() {
	let token

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!")
			return
		}

		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants.easConfig?.projectId,
			})
		).data
	} else {
		alert("Must use physical device for Push Notifications")
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		})
	}

	return token
}
