import {
	NavigationContainer,
	useNavigationContainerRef,
} from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { SafeAreaView, StatusBar } from "react-native"
import { StatusBar as StatusBarExpo } from "expo-status-bar"

import { useAuthContext } from "@/context/auth.context"
import { useOS } from "@/hooks"
import { SCREEN_NAMES } from "@/screens/names"

const Navigator = () => {
	const { isAuthenticated, currentRoute } = useAuthContext()
	const { isAndroid } = useOS()

	const navigationRef = useNavigationContainerRef()
	const currentHeight = isAndroid ? StatusBar.currentHeight : 0
	return (
		<NavigationContainer
			ref={navigationRef}
			onStateChange={state => {
				const _currentRoute = navigationRef.current?.getCurrentRoute()

				const shouldTrackScreen = [SCREEN_NAMES.LOGIN, SCREEN_NAMES.PLAY].every(
					screenName => screenName !== _currentRoute.name
				)
				if (shouldTrackScreen) {
					currentRoute.current = _currentRoute
				}
			}}>
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
