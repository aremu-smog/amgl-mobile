import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MessagesScreen } from "@/screens"

const MessageStack = createNativeStackNavigator()
const MessagesNavigator = () => {
	return (
		<MessageStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<MessageStack.Screen name='MessagesList' component={MessagesScreen} />
		</MessageStack.Navigator>
	)
}

export default MessagesNavigator
