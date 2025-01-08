import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, View, ActivityIndicator } from "react-native"

import { useAuthContext } from "../context/auth.context"

const Navigator = () => {
	const { isAppReady, isAuthenticated } = useAuthContext()

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
				<SafeAreaView style={{ flex: 1 }}>
					<AppNavigator />
				</SafeAreaView>
			) : (
				<AuthNavigator />
			)}
		</NavigationContainer>
	)
}

export default Navigator
