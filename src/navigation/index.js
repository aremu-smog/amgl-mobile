import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, StatusBar } from "react-native"
import { StatusBar as StatusBarExpo } from "expo-status-bar"

import { useAuthContext } from "@/context/auth.context"
import { useOS } from "@/hooks"

const Navigator = () => {
	const { isAuthenticated } = useAuthContext()
	const { isAndroid } = useOS()

	const currentHeight = isAndroid ? StatusBar.currentHeight : 0
	return (
		<NavigationContainer>
			{isAuthenticated ? (
				<SafeAreaView style={{ flex: 1, paddingTop: currentHeight }}>
					<AppNavigator />
					<StatusBarExpo style='dark' backgroundColor='#fff' />
				</SafeAreaView>
			) : (
				<AuthNavigator />
			)}
		</NavigationContainer>
	)
}

export default Navigator
