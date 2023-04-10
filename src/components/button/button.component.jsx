import { useState } from "react"
import { Pressable, Text, StyleSheet } from "react-native"

const Button = ({ text, isLoading, ...props }) => {
	const [isPressed, setIsPressed] = useState(false)
	return (
		<Pressable
			style={[
				styles.container,
				isPressed && styles.pressIn,
				isLoading && styles.isDisabled,
			]}
			onPress={() => {
				alert("Button!")
			}}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			{...props}>
			<Text style={styles.text}>{isLoading ? "Loading..." : text}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "black",
		borderRadius: 100,
	},
	text: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},
	pressIn: {
		opacity: 0.5,
	},
	isDisabled: {
		opacity: 0.5,
	},
})

export default Button
