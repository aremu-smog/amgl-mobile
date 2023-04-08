import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { useFonts } from "expo-font"

export default function App() {
	// useFonts({
	//   'Graphik': require
	// })
	return (
		<AuthContextProvider>
			{/* <SafeAreaView> */}
			<Navigator />
			{/* </SafeAreaView> */}
		</AuthContextProvider>
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
