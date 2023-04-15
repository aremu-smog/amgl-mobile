import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { useFonts } from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthContextProvider>
				<QuestionsContextProvider>
					<Navigator />
				</QuestionsContextProvider>
			</AuthContextProvider>
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
