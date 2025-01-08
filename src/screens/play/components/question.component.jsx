import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Pressable,
	Image,
} from "react-native"
import { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useClipboard } from "../../../hooks"

const QuestionComponent = ({ item, index }) => {
	const { slug, description, url, primary_color, secondary_color } = item

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<LinearGradient
					colors={[primary_color, secondary_color]}
					style={styles.question}>
					<View style={styles.emojiContainer}>
						<Image
							source={emojis[slug]}
							style={styles.emoji}
							resizeMode='contain'
						/>
					</View>
					<Text style={styles.questionText}>{slug}</Text>
				</LinearGradient>
				<View style={styles.description}>
					<Text style={styles.descriptionText}>{description}</Text>
				</View>
			</View>

			<InfoSection url={url} color={primary_color} />
		</View>
	)
}

const InfoSection = ({ url, color }) => {
	const [isPressed, setIsPressed] = useState(false)
	const { copyToClipboard } = useClipboard()
	return (
		<View style={infoStyles.container}>
			<Text style={infoStyles.instruction}>Instruction: Copy your link</Text>

			<Text style={infoStyles.url}>{url}</Text>

			<Pressable
				style={[
					infoStyles.copyButton,
					isPressed && infoStyles.fade,
					{
						borderColor: color,
					},
				]}
				onPress={() => {
					copyToClipboard(url)
				}}
				onPressIn={() => setIsPressed(true)}
				onPressOut={() => {
					setTimeout(() => {
						setIsPressed(false)
					}, 1_000)
				}}>
				<Text
					style={[
						infoStyles.copyButtonText,
						{
							color: color,
						},
					]}>
					{isPressed ? "copied!" : "copy link"}
				</Text>
			</Pressable>
		</View>
	)
}

const emojis = {
	anonymous: require("../../../../assets/emojis/anonymous.png"),
	confessions: require("../../../../assets/emojis/confession.png"),
	friendship: require("../../../../assets/emojis/friendship.png"),
	rizzme: require("../../../../assets/emojis/rizz.png"),
}

const BORDER_RADIUS_VALUE = 24
export const SLIDER_WIDTH = Dimensions.get("window").width
export const ITEM_WIDTH = SLIDER_WIDTH
const styles = StyleSheet.create({
	wrapper: {
		width: ITEM_WIDTH,
		paddingHorizontal: 20,
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
		width: 45,
		height: 45,
	},
	question: {
		borderTopLeftRadius: BORDER_RADIUS_VALUE,
		borderTopRightRadius: BORDER_RADIUS_VALUE,
		padding: 20,
		backgroundColor: "#ec1187",
	},
	questionText: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		color: "#ffffff",
	},
	description: {
		borderBottomLeftRadius: BORDER_RADIUS_VALUE,
		borderBottomRightRadius: BORDER_RADIUS_VALUE,
		paddingHorizontal: 30,
		paddingVertical: 25,
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
