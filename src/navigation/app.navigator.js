import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { MessageDetailsScreen, MessagesScreen, PlayScreen } from "../screens"
import MessagesNavigator from "./messages.navigator"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const Tab = createMaterialTopTabNavigator()

const AppStack = createNativeStackNavigator()

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<AppStack.Screen name='Tabs' component={TabScreens} />
			<AppStack.Screen name='MessageDetails' component={MessageDetailsScreen} />
		</AppStack.Navigator>
	)
}

const TabScreens = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarIndicator: () => null,
				tabBarLabelStyle: {
					fontSize: 18,
					fontWeight: "bold",
				},
				swipeEnabled: false,
				tabBarAndroidRipple: false,
				tabBarGap: 5,
			}}>
			<Tab.Screen name='Play' component={PlayScreen} />
			<Tab.Screen name='Messages' component={MessagesScreen} />
		</Tab.Navigator>
	)
}

export default AppNavigator
