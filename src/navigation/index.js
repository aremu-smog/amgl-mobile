import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useAuthContext } from "../context/auth.context"

const Navigator = () => {
	const { isAuthenticated } = useAuthContext()

	const statusBarHeight = StatusBar.currentHeight
	const IS_ANDROID = Platform.OS === "android"
	const verticalPadding = IS_ANDROID ? statusBarHeight : 0
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
