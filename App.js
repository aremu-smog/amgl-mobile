import { Platform, SafeAreaView, StatusBar } from "react-native"
import Navigator from "./src/navigation"
import { AuthContextProvider } from "./src/context/auth.context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import QuestionsContextProvider from "./src/context/questions.context"
const currentHeight = StatusBar.currentHeight

const marginTop = Platform.OS === "android" ? currentHeight : 0
export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, marginTop }}>
				<AuthContextProvider>
					<QuestionsContextProvider>
						<Navigator />
					</QuestionsContextProvider>
				</AuthContextProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
