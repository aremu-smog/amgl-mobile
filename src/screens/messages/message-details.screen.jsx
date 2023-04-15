import { View, Text, StyleSheet } from "react-native"
import { ResponseComponent } from "./components"
import { useRoute } from "@react-navigation/native"

const MessageDetailsScreen = ({}) => {
	const route = useRoute()

	const { params = {} } = route

	const { question, response } = params
	return (
		<View style={styles.wrapper}>
			<ResponseComponent question={question} answer={response} />
		</View>
	)
}

export default MessageDetailsScreen

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
})
