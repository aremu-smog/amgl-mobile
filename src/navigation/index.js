import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app.navigator"
import AuthNavigator from "./auth.navigator"
import { useAuthContext } from "../context/auth.context"

const Navigator = () => {
	const { isAuthenticated } = useAuthContext()
	console.log({ isAuthenticated })
	return (
		<NavigationContainer>
			{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	)
}

export default Navigator
