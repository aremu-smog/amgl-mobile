import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"

const MessagesScreen = () => {
	const { user } = useAuthContext()
	const [messages, setMessages] = useState([])

	const fetchResponses = async () => {
		const { data, error } = await supabaseApp
			.from("responses")
			.select("id, question_id, details, viewed")
			.eq("user_id", user.id)

		if (data) {
			console.log(data)
			setMessages(data)
		}
		if (error) {
			console.warn(error)
		}
	}
	useEffect(() => {
		fetchResponses()
	}, [user])

	console.log({ messages })
	return (
		<View>
			<Text>Messages</Text>

			{messages.map(message => {
				return <Text key={message.id}>💌</Text>
			})}
		</View>
	)
}

export default MessagesScreen
