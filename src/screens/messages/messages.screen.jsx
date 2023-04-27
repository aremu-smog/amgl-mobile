import { useEffect, useCallback, useState } from "react"
import {
	StyleSheet,
	Image,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { useQuestionsContext } from "../../context/questions.context"
import { useFocusEffect } from "@react-navigation/native"

const loveIconSrc = require("../../../assets/love-letter.png")
const MessagesScreen = ({ navigation }) => {
	const { user } = useAuthContext()
	const { questions } = useQuestionsContext()
	const [messages, setMessages] = useState([])

	const fetchResponses = async () => {
		console.log("Fetch responses")
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
	}

	useFocusEffect(
		useCallback(() => {
			fetchResponses()
		}, [])
	)

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
