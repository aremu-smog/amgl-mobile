import { View } from "react-native"
import { useEffect } from "react"
import Carousel from "react-native-reanimated-carousel"

import { supabaseApp } from "@/api/supabase"
import { QuestionComponent } from "./components"
import { SLIDER_WIDTH } from "./components/question.component"
import { useAuthContext } from "@/context/auth.context"
import { useQuestionsContext } from "@/context/questions.context"
import { WEBSITE_BASE_URL } from "@env"
import { PageLoader } from "@/components"

const PlayScreen = () => {
	const { questions, setQuestions } = useQuestionsContext()
	const hasQuestions = questions.length > 0

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
		if (!!username) {
			fetchQuestions(username)
		}
	}, [username])

	if (!hasQuestions) return <PageLoader />
	return (
		<View
			style={{
				paddingTop: 30,
			}}>
			<Carousel
				loop
				showLength
				data={questions}
				renderItem={QuestionComponent}
				pagingEnabled={true}
				width={SLIDER_WIDTH}
				enabled
			/>
		</View>
	)
}

export default PlayScreen
