import { useState, useRef, useEffect } from "react"
import { ActivityIndicator, Text, View, StyleSheet } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"
import * as Updates from "expo-updates"
import * as Notifications from "expo-notifications"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})

export default function App() {
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	const { isUpdateAvailable, isDownloading, isChecking } = Updates.useUpdates()
	const [isAppReady, setIsAppReady] = useState(false)

	/**
	 * Check for updates when user's load the application
	 */
	useEffect(() => {
		Updates.checkForUpdateAsync()
	}, [])

	/**
	 * If we are not checking for updates and app is ready
	 * Hide splash screen
	 */
	useEffect(() => {
		if (!isChecking && isAppReady) {
			SplashScreen.hideAsync()
		}
	}, [isChecking, isAppReady])

	useEffect(() => {
		if (isUpdateAvailable) {
			Updates.fetchUpdateAsync().then(() => {
				Updates.reloadAsync()
			})
		}
	}, [isUpdateAvailable])
	useEffect(() => {
		notificationListener.current =
			Notifications.addNotificationReceivedListener(notification => {
				setNotification(notification)
			})

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(response => {
				console.log(response)
			})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	/**
	 * If we are downloading
	 */
	if (isDownloading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<View>
					<ActivityIndicator size='small' color='#ec1187' />
					<Text style={style.updateText}>Updating your app</Text>
				</View>
			</View>
		)
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthContextProvider setIsAppReady={setIsAppReady}>
				<QuestionsContextProvider>
					<Navigator />
				</QuestionsContextProvider>
			</AuthContextProvider>
		</GestureHandlerRootView>
	)
}

const style = StyleSheet.create({
	updateText: {
		marginTop: 16,
	},
})
