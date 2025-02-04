const { useCallback } = require("react")
const { useEnablePushNotification } = require("./useEnablePushNotification")
import { useFocusEffect } from "@react-navigation/native"
import * as Notifications from "expo-notifications"
import { Alert } from "react-native"
import * as Device from "expo-device"

export const useCheckPushNotificationStatus = () => {
	const { enablePushNotification } = useEnablePushNotification()
	useFocusEffect(
		useCallback(() => {
			const checkStatus = async () => {
				const {
					granted,
					ios = {},
					status,
				} = await Notifications.getPermissionsAsync()

				const isGranted =
					granted ||
					ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL

				/**
				 * Push notification not granted an OS level
				 */
				if (!isGranted && Device.isDevice) {
					Alert.alert(
						"Never miss a message",
						"Get notified when new messages are sent to you",
						[
							{
								text: "Enable Push Notification",
								onPress: enablePushNotification,
							},
							{
								text: "No, Thanks!",
								onPress: () => null,
							},
						]
					)
				}
			}

			checkStatus()
		}, [])
	)
}
