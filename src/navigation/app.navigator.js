import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { MessageDetailsScreen, MessagesScreen, PlayScreen } from "../screens"
const Tab = createMaterialTopTabNavigator()

const AppStack = createNativeStackNavigator()

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<AppStack.Screen name='Tabs' component={TabScreens} />
			<AppStack.Screen
				name='MessageDetails'
				options={{
					presentation: "fullScreenModal",
				}}
				component={MessageDetailsScreen}
			/>
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
					fontSize: 16,
					fontWeight: "bold",
				},
				swipeEnabled: false,
				tabBarAndroidRipple: false,
				tabBarGap: 5,
			}}>
			<Tab.Screen name='Play' component={PlayScreen} />
			<Tab.Screen name='Messages' component={MessagesScreen} />
			<Tab.Screen name='Settings' component={MessagesScreen} />
		</Tab.Navigator>
	)
}

export default AppNavigator
