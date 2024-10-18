import { useCallback } from "react"
import {
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
	Alert,
} from "react-native"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { useFocusEffect } from "@react-navigation/native"
import { MessagesLoading, NoMessages } from "./components"
import {
	useDetailsPage,
	useEnablePushNotification,
	useResponses,
} from "./hooks"
import * as Device from "expo-device"

const loveIconSrc = require("../../../assets/love-letter.png")

const MessagesScreen = () => {
	const { user } = useAuthContext()

	const { enablePushNotification } = useEnablePushNotification()

	const user_id = user?.id
	const { isFetching, messages, fetchResponses } = useResponses({ user_id })

	const { gotoDetailsPage } = useDetailsPage()

	const doesNotHaveMessages = !messages.length
	const isLoading = isFetching && doesNotHaveMessages

	useFocusEffect(
		useCallback(() => {
			fetchResponses()
		}, [])
	)
	useFocusEffect(
		useCallback(() => {
			if (!user.push_notification_enabled && Device.isDevice) {
				/**
				 * Update Logic for PN enabling and disabling
				 */
				Alert.alert(
					"Never miss a message",
					"Get notified when new messages are sent to you",

					[
						{
							text: "Enable Push Notification",
							onPress: enablePushNotification,
						},
					]
				)
			}
		}, [user])
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
					<TouchableOpacity
						onPress={() => gotoDetailsPage(item, fetchResponses)}>
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
