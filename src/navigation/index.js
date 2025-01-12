import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, View, ActivityIndicator } from "react-native"

import { useAuthContext } from "@/context/auth.context"
import { Fragment } from "react"

const Navigator = () => {
	const { isAuthenticated } = useAuthContext()

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
