import { View, ActivityIndicator, StyleSheet } from "react-native"

const MessagesLoading = () => {
	return (
		<View style={styles.loaderContainer}>
			<ActivityIndicator size='large' color='#ec1187' />
		</View>
	)
}

export default MessagesLoading

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
