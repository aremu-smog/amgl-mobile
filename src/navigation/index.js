import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, Platform, View, ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useAuthContext } from "../context/auth.context"

const Navigator = () => {
	const { isAppReady, isAuthenticated } = useAuthContext()

	const statusBarHeight = StatusBar.currentHeight
	const IS_ANDROID = Platform.OS === "android"
	const verticalPadding = IS_ANDROID ? statusBarHeight : 0

	if (!isAppReady) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' color='#ec1187' />
			</View>
		)
	}
	return (
		<NavigationContainer>
			{isAuthenticated ? (
				<SafeAreaView style={{ flex: 1, marginTop: verticalPadding }}>
					<AppNavigator />
				</SafeAreaView>
			) : (
				<AuthNavigator />
			)}
		</NavigationContainer>
	)
}

export default Navigator
