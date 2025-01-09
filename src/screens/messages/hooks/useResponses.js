import { supabaseApp } from "@/api/supabase"
import { useState } from "react"

/**
 * Fetch all responses set to a user
 *
 * @param {Object} Prop - Responses input prop
 * @param {string} Prop.user_id - Id of the user
 *
 * @typedef {Object} Response
 * @property {Array} messages
 * @property {boolean} isFetching
 * @property {Function} fetchResponses
 *
 * @returns {Response}
 */
export const useResponses = ({ user_id }) => {
	const [messages, setMessages] = useState([])
	const [isFetching, setIsFetching] = useState(true)

	const fetchResponses = async () => {
		const { data, error } = await supabaseApp
			.from("responses")
			.select("id, question_id, details, viewed")
			.eq("user_id", user_id)
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

	return {
		messages,
		isFetching,
		fetchResponses,
	}
}
