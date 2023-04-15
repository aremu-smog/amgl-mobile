import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, Text, View } from "react-native"
import { MessagesScreen, PlayScreen } from "../screens"
import MessagesNavigator from "./messages.navigator"
const AppStack = createMaterialTopTabNavigator()

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			screenOptions={{
				tabBarIndicator: () => null,
				tabBarLabelStyle: {
					fontSize: 18,
					fontWeight: "bold",
				},
				swipeEnabled: false,
				tabBarAndroidRipple: false,
				tabBarGap: 5,
			}}>
			<AppStack.Screen name='Play' component={PlayScreen} />
			<AppStack.Screen name='Messages' component={MessagesNavigator} />
		</AppStack.Navigator>
	)
}

export default AppNavigator
