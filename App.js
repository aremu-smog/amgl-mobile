import { useState, useRef, useEffect } from "react"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"
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
