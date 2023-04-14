import { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, Image } from "react-native"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"

const loveIconSrc = require("../../../assets/love-letter.png")
const MessagesScreen = () => {
	const { user } = useAuthContext()
	const [messages, setMessages] = useState([])

	const fetchResponses = async () => {
		const { data, error } = await supabaseApp
			.from("responses")
			.select("id, question_id, details, viewed")
			.eq("user_id", user.id)

		if (data) {
			setMessages(data)
		}
		if (error) {
			console.warn(error)
		}
	}
	useEffect(() => {
		console.log("Component mounted")
		fetchResponses()
	}, [user])

	return (
		<ScrollView
			contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
			style={styles.container}>
			{messages.map(message => {
				const { viewed } = message
				const viewedColor = "rgba(0,0,0,0.1)"

				return (
					<LinearGradient
						colors={[
							viewed ? viewedColor : "#ec1187",
							viewed ? viewedColor : "#ff8d10",
						]}
						key={message.id}
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
				)
			})}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingTop: 20,
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
