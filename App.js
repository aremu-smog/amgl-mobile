import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const statusBarHeight = StatusBar.currentHeight

const IS_ANDROID = Platform.OS === "android"
const verticalPadding = IS_ANDROID ? statusBarHeight : 0

console.log({ statusBarHeight })
export default function App() {
	// useFonts({
	//   'Graphik': require
	// })
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, marginTop: verticalPadding }}>
				<AuthContextProvider>
					<Navigator />
				</AuthContextProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
