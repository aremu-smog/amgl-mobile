import React, { useState } from "react"
import { Switch, View, Text } from "react-native"
import { Button } from "../../components"

const SettingsScreen = () => {
	const [isEnabled, setIsEnabled] = useState(false)

	const toggleSwitch = () => {
		setIsEnabled(prev => !prev)
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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Text>Push notifications:</Text>
					<Switch
						trackColor={{ false: "#D6D6D6", true: "#086C72" }}
						ios_backgroundColor='#3e3e3e'
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
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
