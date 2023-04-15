import { useEffect, useState } from "react"
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"

const loveIconSrc = require("../../../assets/love-letter.png")
const MessagesScreen = ({ navigation }) => {
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

	const gotoDetailsPage = () => {
		navigation.navigate("MessageDetails")
	}
	useEffect(() => {
		console.log("Component mounted")
		fetchResponses()
	}, [user])

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
					<TouchableOpacity onPress={gotoDetailsPage}>
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
	container: {
		// flexDirection: "row",
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
