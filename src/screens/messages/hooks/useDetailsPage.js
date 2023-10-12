import { useNavigation } from "@react-navigation/native"
import { useCallback } from "react"

import { useQuestionsContext } from "../../../context/questions.context"
import { supabaseApp } from "../../../api/supabase"

/**
 * @typedef {Object} Response
 * @property {Function} gotoDetailsPage
 *
 * @returns Response
 */
export const useDetailsPage = () => {
	const navigation = useNavigation()
	const { questions } = useQuestionsContext()

	/**
	 * @param {string} item.id - Response id
	 * @param {string} item.question_id - Id of the question belonging to the response
	 * @param {string} item.details - Full response text
	 * @param {boolean} item.viewed - Has the user seen the item or not
	 * @param {Function} postAction
	 */
	const gotoDetailsPage = useCallback(
		async (item, postAction) => {
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
			/* Action to carryout when logic above is done running */
			postAction()
		},
		[questions]
	)

	return {
		gotoDetailsPage,
	}
}
