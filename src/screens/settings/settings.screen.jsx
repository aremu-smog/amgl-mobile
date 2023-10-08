import React, { useState } from "react"
import { View, Text, Alert, Image } from "react-native"
import { Button } from "../../components"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

const profileImage = require("../../../assets/profile.png")

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

const SettingsScreen = () => {
	const { user } = useAuthContext()

	const enablePushNotification = () => {
		registerForPushNotificationsAsync().then(async token => {
			try {
				const { data, error } = await supabaseApp
					.from("push_notifications")
					.insert({
						user_id: user?.id,
						expo_token: token,
					})
					.select()

				if (data) {
					Alert.alert("Push Notification Enabled")
				}

				if (error) {
					console.error(error.message)
				}
			} catch (e) {
				console.error(e.message)
			}
		})
	}
	return (
		<View
			style={{
				padding: 20,
				flex: 1,
				justifyContent: "space-between",
			}}>
			<View>
				<View
					style={{
						alignSelf: "center",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Image
						source={profileImage}
						style={{ width: 120, height: 80 }}
						resizeMode='contain'
					/>
					<Text
						style={{
							fontSize: 14,
							fontWeight: "600",
							textTransform: "uppercase",
							textAlign: "center",
							// marginVertical: 20,
						}}>
						{user?.username}
					</Text>
				</View>

				{/* <View>
					<Button
						text='Enable Push Notifications'
						onPress={enablePushNotification}
					/>
				</View> */}
			</View>
			<View style={{ flex: 1, marginVertical: 24 }}>
				<LinearGradient
					colors={["#ec1187", "#ff8d10"]}
					style={{ flex: 1, borderRadius: 20 }}></LinearGradient>
			</View>
			<View>
				<LogoutButton />
				<Text style={{ opacity: 0.5, textAlign: "center" }}>
					v{Constants.manifest.version}
				</Text>
			</View>
		</View>
	)
}

const LogoutButton = () => {
	const [isLoading, setIsLoading] = useState(false)

	const logout = async () => {
		setIsLoading(true)
		const { error } = await supabaseApp.auth.signOut()
		if (error) {
			console.error(e.message)
		}
		setIsLoading(false)
	}
	return (
		<Button
			text='Log out'
			isLoading={isLoading}
			onPress={logout}
			style={{ marginBottom: 20 }}
		/>
	)
}

export default SettingsScreen
