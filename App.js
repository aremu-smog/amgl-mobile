import { useState, useRef, useEffect } from "react"
import { Platform, SafeAreaView, StatusBar } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"
const currentHeight = StatusBar.currentHeight
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Button } from "./src/components"
import Constants from "expo-constants"

const marginTop = Platform.OS === "android" ? currentHeight : 0

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

async function sendPushNotification(expoPushToken) {
	console.log("Send Push Notification...")
	console.log({ expoPushToken })
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Original Title",
		body: "And here is the body!",
		data: { someData: "goes here" },
	}

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	})
		.then(res => {
			return res.json()
		})
		.then(data => console.log(data))
		.catch(e => {
			console.error(e.message)
		})
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

		console.log("Project id", Constants.expoConfig?.extra?.eas?.projectId)
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants.easConfig?.projectId,
			})
		).data
		console.log({ finalStatus })
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

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState("")
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	console.log({
		expoPushToken,
	})
	useEffect(() => {
		registerForPushNotificationsAsync().then(token => {
			console.log({ token })
			setExpoPushToken(token)
		})

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
			<SafeAreaView style={{ flex: 1, marginTop }}>
				<AuthContextProvider>
					<QuestionsContextProvider>
						<Button
							text='Send Push Notification'
							onPress={async () => {
								await sendPushNotification(expoPushToken)
							}}
						/>
						{/* <Navigator /> */}
					</QuestionsContextProvider>
				</AuthContextProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
