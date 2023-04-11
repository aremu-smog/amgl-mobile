import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, Text, View } from "react-native"
import { MessagesScreen, PlayScreen } from "../screens"
const AppStack = createMaterialTopTabNavigator()

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			screenOptions={{
				tabBarIndicator: () => null,
				tabBarLabelStyle: {
					fontSize: 18,
					fontWeight: "bold",
					textTransform: "none",
				},
				swipeEnabled: false,
				tabBarAndroidRipple: false,
				tabBarGap: 5,
			}}>
			<AppStack.Screen name='Play' component={PlayScreen} />
			<AppStack.Screen name='Messages' component={MessagesScreen} />
		</AppStack.Navigator>
	)
}

export default AppNavigator