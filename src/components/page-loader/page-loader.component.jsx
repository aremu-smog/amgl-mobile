import { View, ActivityIndicator, StyleSheet } from "react-native"

const PageLoader = () => {
	return (
		<View style={styles.loaderContainer}>
			<ActivityIndicator size='large' color='#ec1187' />
		</View>
	)
}

export default PageLoader

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
