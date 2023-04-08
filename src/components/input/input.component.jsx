import { TextInput, StyleSheet } from "react-native"

const Input = props => {
	return <TextInput style={styles.container} {...props} />
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		paddingHorizontal: 20,
		borderRadius: 15,
		marginBottom: 10,
		borderColor: "black",
		backgroundColor: "rgba(255,255,255,0.4)",
		fontWeight: "bold",
		color: "black",
		textTransform: "lowercase",
	},
})

export default Input
