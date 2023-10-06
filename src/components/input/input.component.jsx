import { TextInput, StyleSheet, Text, View } from "react-native"

const Input = ({ errorMessage, ...props }) => {
	return (
		<View style={{ marginBottom: 16 }}>
			<TextInput style={styles.container} {...props} />
			{errorMessage && (
				<Text style={{ color: "white" }}>⚠️ {errorMessage}</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		paddingHorizontal: 20,
		borderRadius: 15,
		marginBottom: 8,
		borderColor: "black",
		backgroundColor: "rgba(255,255,255,0.4)",
		fontWeight: "bold",
		color: "black",
		textTransform: "lowercase",
	},
})

export default Input
