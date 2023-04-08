import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, RegisterScreen } from "../screens"

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<AuthStack.Screen name='Login' component={LoginScreen} />
			<AuthStack.Screen name='Register' component={RegisterScreen} />
		</AuthStack.Navigator>
	)
}

export default AuthNavigator
