import React, { useState } from "react"
import { View, Text, Alert, Image } from "react-native"
import { Button } from "../../components"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import Constants from "expo-constants"

const profileImage = require("../../../assets/profile.png")

const SettingsScreen = () => {
	const { user } = useAuthContext()

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
