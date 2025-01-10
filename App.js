import { useState, useRef, useEffect } from "react"
import {
	ActivityIndicator,
	Platform,
	Text,
	StatusBar,
	View,
	StyleSheet,
} from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"
import * as Updates from "expo-updates"
const currentHeight = StatusBar.currentHeight
import * as Notifications from "expo-notifications"

const marginTop = Platform.OS === "android" ? currentHeight : 0

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

	const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
		Updates.useUpdates()

	const isCurrentlyRunning = !!currentlyRunning

	useEffect(() => {
		if (isUpdateAvailable) {
			Updates.checkForUpdateAsync()
		}
	}, [isUpdateAvailable])

	useEffect(() => {
		if (isUpdatePending) {
			Updates.fetchUpdateAsync()
		}
	}, [isUpdatePending])
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

	if (isCurrentlyRunning) {
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
			<AuthContextProvider>
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
