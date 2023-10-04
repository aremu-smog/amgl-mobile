import React, { useState } from "react"
import { Switch, View, Text, Alert } from "react-native"
import { Button } from "../../components"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

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
	const [isEnabled, setIsEnabled] = useState(false)
	const { user } = useAuthContext()

	const toggleSwitch = () => {
		setIsEnabled(prev => !prev)
	}

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
						width: 125,
						height: 125,
						backgroundColor: "black",
						borderRadius: 250,
						alignSelf: "center",
						marginBottom: 24,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ fontSize: 72 }}>😉</Text>
				</View>
				<View>
					<Button
						text='Enable Push Notifications'
						onPress={enablePushNotification}
					/>
					{/* <Switch
						trackColor={{ false: "#D6D6D6", true: "#086C72" }}
						ios_backgroundColor='#3e3e3e'
						onValueChange={toggleSwitch}
						value={isEnabled}
					/> */}
				</View>
			</View>
			<LogoutButton />
		</View>
	)
}

const LogoutButton = () => {
	const [isLoading, setIsLoading] = useState(false)

	const logout = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
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
