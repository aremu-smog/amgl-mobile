import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, RegisterScreen } from "@/screens"
import { SCREEN_NAMES } from "@/screens/names"

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<AuthStack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
			<AuthStack.Screen
				name={SCREEN_NAMES.REGISTER}
				component={RegisterScreen}
			/>
		</AuthStack.Navigator>
	)
}

export default AuthNavigator
