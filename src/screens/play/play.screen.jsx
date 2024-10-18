import { View, Text } from "react-native"
import { useEffect } from "react"
import Carousel from "react-native-reanimated-carousel"

import { supabaseApp } from "../../api/supabase"
import { QuestionComponent } from "./components"
import { ITEM_WIDTH, SLIDER_WIDTH } from "./components/question.component"
import { useAuthContext } from "../../context/auth.context"
import { useQuestionsContext } from "../../context/questions.context"
import { WEBSITE_BASE_URL } from "@env"

const PlayScreen = () => {
	const { questions, setQuestions } = useQuestionsContext()

	const { user } = useAuthContext()
	const { username } = user ?? {}

	const fetchQuestions = async _username => {
		const { data, error } = await supabaseApp
			.from("questions")
			.select("id,slug,description,primary_color,secondary_color")

		if (data) {
			const transformedData = await data.map(question => {
				const { slug } = question
				const url = `${WEBSITE_BASE_URL}/${_username}/${slug}`
				return {
					...question,
					url,
				}
			})
			setQuestions(transformedData)
		}
		if (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		fetchQuestions(username)
	}, [username])

	return (
		<View
			style={{
				paddingTop: 30,
			}}>
			{questions ? (
				<Carousel
					loop
					showLength
					data={questions}
					renderItem={QuestionComponent}
					pagingEnabled={true}
					width={SLIDER_WIDTH}
					enabled
				/>
			) : (
				<View>
					<Text>Loading...</Text>
				</View>
			)}
		</View>
	)
}

export default PlayScreen
