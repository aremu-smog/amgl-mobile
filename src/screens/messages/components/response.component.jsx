import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, Dimensions } from "react-native"

const ResponseComponent = ({
	question = "ask me anonymous question",
	answer = "the one thing you regret in life?",
}) => {
	return (
		<View style={styles.container}>
			<LinearGradient colors={["#ec1187", "#ff8d10"]} style={styles.question}>
				<Text style={styles.questionText}>{question}</Text>
			</LinearGradient>
			<View style={styles.description}>
				<Text style={styles.descriptionText}>{answer}</Text>
			</View>
		</View>
	)
}

export default ResponseComponent

const BORDER_RADIUS_VALUE = 24
export const SLIDER_WIDTH = Dimensions.get("window").width
export const ITEM_WIDTH = SLIDER_WIDTH

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS_VALUE,
		shadowColor: "black",
	},

	question: {
		borderTopStartRadius: BORDER_RADIUS_VALUE,
		borderTopEndRadius: BORDER_RADIUS_VALUE,
		paddingHorizontal: 20,
		paddingVertical: 30,
		backgroundColor: "#ec1187",
	},
	questionText: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		color: "white",
	},
	description: {
		borderBottomStartRadius: BORDER_RADIUS_VALUE,
		borderBottomEndRadius: BORDER_RADIUS_VALUE,
		paddingHorizontal: 30,
		paddingVertical: 30,
		backgroundColor: "white",
	},
	descriptionText: {
		fontSize: 20,
		fontWeight: "600",
		textAlign: "center",
	},
})
