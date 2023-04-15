import { View, Text, SafeAreaView } from "react-native"
import { useEffect, useState, useRef } from "react"
import Carousel from "react-native-reanimated-carousel"

import { supabaseApp } from "../../api/supabase"
import { QuestionComponent } from "./components"
import { ITEM_WIDTH, SLIDER_WIDTH } from "./components/question.component"
import { useAuthContext } from "../../context/auth.context"
import { useQuestionsContext } from "../../context/questions.context"

const PlayScreen = () => {
	const { questions, setQuestions } = useQuestionsContext()

	const { user } = useAuthContext()
	const { username } = user ?? {}

	const fetchQuestions = async _username => {
		const { data, error } = await supabaseApp
			.from("questions")
			.select("id,slug,description")

		if (data) {
			const transformedData = await data.map(question => {
				const { slug } = question
				const url = `${process.env.REACT_APP_WEBSITE_BASE_URL}/${_username}/${slug}`
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

	const isCarousel = useRef(null)
	return (
		<>
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
		</>
	)
}

export default PlayScreen
