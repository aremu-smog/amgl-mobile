import { useEffect, useCallback, useState } from "react"
import {
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { useQuestionsContext } from "../../context/questions.context"
import { useFocusEffect } from "@react-navigation/native"
import { MessagesLoading, NoMessages } from "./components"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"

const loveIconSrc = require("../../../assets/love-letter.png")

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

const MessagesScreen = ({ navigation }) => {
	const { user } = useAuthContext()
	const { questions } = useQuestionsContext()
	const [messages, setMessages] = useState([])
	const [isFetching, setIsFetching] = useState(false)

	const doesNotHaveMessages = !messages.length
	const isLoading = isFetching && doesNotHaveMessages

	const enablePushNotification = () => {
		registerForPushNotificationsAsync().then(async token => {
			console.log({ token })
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

	const fetchResponses = async () => {
		setIsFetching(true)
		const { data, error } = await supabaseApp
			.from("responses")
			.select("id, question_id, details, viewed")
			.eq("user_id", user.id)
			.order("viewed", {
				ascending: true,
			})

		if (data) {
			setMessages(data)
		}
		if (error) {
			console.warn(error)
		}
		setIsFetching(false)
	}

	const gotoDetailsPage = async item => {
		const { id, question_id, details, viewed } = item

		const responseQuestion = await questions.find(
			_question => _question.id === question_id
		)

		if (!viewed) {
			const { data, error } = await supabaseApp
				.from("responses")
				.update({
					viewed: true,
				})
				.eq("id", id)

			if (error) {
				console.error({ error })
			}
		}

		await navigation.navigate("MessageDetails", {
			question: responseQuestion.description,
			response: details,
		})
		/* We are refetching the responses so that when the user comes back to this screen, 
		the item is already greyed out */
		fetchResponses()
	}

	useFocusEffect(
		useCallback(() => {
			fetchResponses()
		}, [])
	)
	useFocusEffect(
		useCallback(() => {
			fetchResponses()

			/**
			 * Update Logic for PN enabling and disabling
			 */
			Alert.alert(
				"Never miss a message",
				"Get notified when you receive new messages",
				[
					{
						text: "Enable Push Notification",
						onPress: enablePushNotification,
					},
				]
			)
		}, [])
	)

	if (isLoading) {
		return <MessagesLoading />
	}

	if (doesNotHaveMessages) {
		return <NoMessages />
	}
	return (
		<FlatList
			style={styles.container}
			data={messages}
			numColumns={3}
			keyExtractor={item => item.id}
			renderItem={({ item }) => {
				const { viewed } = item
				const viewedColor = "rgba(0,0,0,0.1)"

				return (
					<TouchableOpacity onPress={() => gotoDetailsPage(item)}>
						<LinearGradient
							colors={[
								viewed ? viewedColor : "#ec1187",
								viewed ? viewedColor : "#ff8d10",
							]}
							key={item.id}
							style={{
								...styles.item,
							}}>
							<Image
								source={loveIconSrc}
								style={{
									width: 60,
									height: 60,
									opacity: viewed ? 0.7 : 1,
								}}
							/>
						</LinearGradient>
					</TouchableOpacity>
				)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		paddingTop: 20,
		flex: 1,
	},

	item: {
		margin: 10,
		borderRadius: 30,
		height: 100,
		width: 100,
		alignItems: "center",
		justifyContent: "center",
	},
})

export default MessagesScreen
