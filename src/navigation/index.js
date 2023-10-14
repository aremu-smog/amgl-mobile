import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, Platform, View, ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useAuthContext } from "../context/auth.context"
import { useState } from "react"
import { SCREEN_NAMES } from "../screens/names"

const Navigator = () => {
	const { isAppReady, isAuthenticated } = useAuthContext()

	const statusBarHeight = StatusBar.currentHeight
	const IS_ANDROID = Platform.OS === "android"
	const verticalPadding = IS_ANDROID ? statusBarHeight : 0

	if (!isAppReady) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' color='#ec1187' />
			</View>
		)
	}
	return (
		<NavigationContainer
			linking={{
				config: {},
				async getInitialURL() {
					// 		const url = await Linking.getInitialURL();

					//   if (url != null) {
					//     return url;
					//   }

					// Handle URL from expo push notifications
					//   const response = await Notifications.getLastNotificationResponseAsync();

					//   return response?.notification.request.content.data.url;
					return SCREEN_NAMES.MESSAGES
				},
				subscribe(listener) {
					const onReceiveURL = ({ url }) => listener(url)

					const eventListenerSubscription = Linking.addEventListener(
						"url",
						onReceiveURL
					)
					const subscription =
						Notifications.addNotificationResponseReceivedListener(response => {
							const url = response.notification.request.content.data.url

							// Any custom logic to see whether the URL needs to be handled
							//...

							// Let React Navigation handle the URL
							listener(url)
						})

					return () => {
						// Clean up the event listeners
						eventListenerSubscription.remove()
						subscription.remove()
					}
				},
			}}>
			{isAuthenticated ? (
				<SafeAreaView style={{ flex: 1, marginTop: verticalPadding }}>
					<AppNavigator />
				</SafeAreaView>
			) : (
				<AuthNavigator />
			)}
		</NavigationContainer>
	)
}

export default Navigator
