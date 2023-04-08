import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, Text, View } from "react-native"
import { PlayScreen } from "../screens"
const AppStack = createMaterialTopTabNavigator()

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			swipeEnabled={false}
			screenOptions={{
				tabBarIndicator: () => null,
				tabBarLabelStyle: {
					fontSize: 18,
					fontWeight: "bold",
					textTransform: "none",
					marginTop: 50,
				},
				swipeEnabled: false,
				tabBarAndroidRipple: false,
				tabBarGap: 5,
			}}>
			<AppStack.Screen name='Play' component={PlayScreen} />
			<AppStack.Screen
				name='Messages'
				component={() => {
					return <StatusBar style='auto' />
				}}
			/>
		</AppStack.Navigator>
	)
}

export default AppNavigator
