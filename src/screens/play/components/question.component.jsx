import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native"
import * as Clipboard from "expo-clipboard"
import { useAuthContext } from "../../../context/auth.context"
import { useState } from "react"
const QuestionComponent = ({ item, index }) => {
	const { slug, description, url } = item

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<View style={styles.question}>
					<View style={styles.emojiContainer}>
						<Text style={styles.emoji}>{emojis[slug]}</Text>
					</View>
					<Text style={styles.questionText}>{slug}</Text>
				</View>
				<View style={styles.description}>
					<Text style={styles.descriptionText}>{description}</Text>
				</View>
			</View>

			<InfoSection url={url} />
		</View>
	)
}

const InfoSection = ({ url }) => {
	const [isPressed, setIsPressed] = useState(false)
	return (
		<View style={infoStyles.container}>
			<Text style={infoStyles.instruction}>Instruction: Copy your link</Text>

			<Text style={infoStyles.url}>{url}</Text>

			<Pressable
				style={[infoStyles.copyButton, isPressed && infoStyles.fade]}
				onPress={() => {
					copyToClipboard(url)
				}}
				onPressIn={() => setIsPressed(true)}
				onPressOut={() => setIsPressed(false)}>
				<Text style={infoStyles.copyButtonText}>copy Link</Text>
			</Pressable>
		</View>
	)
}

const copyToClipboard = async text => {
	await Clipboard.setStringAsync(text)
}

const emojis = {
	anonymous: "🎭",
	confessions: "🔊",
	friendship: "👯‍♀️",
	rizzme: "💦",
}

const BORDER_RADIUS_VALUE = 24
export const SLIDER_WIDTH = Dimensions.get("window").width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
const styles = StyleSheet.create({
	wrapper: {
		width: ITEM_WIDTH,
	},
	container: {
		borderRadius: BORDER_RADIUS_VALUE,
		shadowColor: "black",
		marginVertical: 20,
	},
	emojiContainer: {
		width: 80,
		height: 80,
		alignSelf: "center",
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 120,
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	emoji: {
		fontSize: 50,
	},
	question: {
		borderTopStartRadius: BORDER_RADIUS_VALUE,
		borderTopEndRadius: BORDER_RADIUS_VALUE,
		padding: 20,
		backgroundColor: "#ec1187",
	},
	questionText: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
	},
	description: {
		borderBottomStartRadius: BORDER_RADIUS_VALUE,
		borderBottomEndRadius: BORDER_RADIUS_VALUE,
		padding: 20,
		backgroundColor: "white",
	},
	descriptionText: {
		fontSize: 20,
		fontWeight: "600",
		textAlign: "center",
	},
})

const infoStyles = StyleSheet.create({
	container: {
		padding: 32,
		borderRadius: 12,
		marginTop: 20,
		backgroundColor: "white",
	},
	instruction: {
		fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
	},
	url: {
		fontSize: 14,
		fontWeight: "600",
		textTransform: "uppercase",
		textAlign: "center",
		marginVertical: 20,
		opacity: 0.6,
	},

	copyButton: {
		borderWidth: 3,
		paddingVertical: 4,
		paddingHorizontal: 24,
		borderColor: "#5174EC",
		alignSelf: "center",
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center",
	},

	fade: {
		opacity: 0.5,
	},
	copyButtonText: {
		fontWeight: "700",
		fontSize: 16,
		color: "#5174EC",
	},
})

export default QuestionComponent