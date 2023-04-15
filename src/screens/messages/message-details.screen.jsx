import { View, Text, StyleSheet } from "react-native"
import { ResponseComponent } from "./components"

const MessageDetailsScreen = () => {
	return (
		<View style={styles.wrapper}>
			<ResponseComponent />
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
