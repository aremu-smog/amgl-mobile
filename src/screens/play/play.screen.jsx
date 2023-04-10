import { View, Text, SafeAreaView } from "react-native"
import { useEffect, useState, useRef } from "react"
import Carousel from "react-native-snap-carousel"

import { supabaseApp } from "../../api/supabase"
import { QuestionComponent } from "./components"
import { ITEM_WIDTH, SLIDER_WIDTH } from "./components/question.component"
import { useAuthContext } from "../../context/auth.context"

const PlayScreen = () => {
	const [questions, setQuestions] = useState([])
	const { user } = useAuthContext()
	const { username } = user ?? {}

	const fetchQuestions = async _username => {
		const { data, error } = await supabaseApp
			.from("questions")
			.select("id,slug,description")

		if (data) {
			const transformedData = await data.map(question => {
				const { slug } = question
				const url = `amgl.link/${_username}/${slug}`
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
					layout='default'
					ref={isCarousel}
					data={questions}
					renderItem={QuestionComponent}
					sliderWidth={SLIDER_WIDTH}
					itemWidth={ITEM_WIDTH}
					layoutCardOffset={0}
					inactiveSlideShift={0}
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
