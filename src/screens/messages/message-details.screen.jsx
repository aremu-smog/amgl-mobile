import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native"
import { ResponseComponent } from "./components"
import { useNavigation, useRoute } from "@react-navigation/native"

const MessageDetailsScreen = ({}) => {
	const route = useRoute()
	const navigation = useNavigation()

	const { params = {} } = route

	const { question, response } = params
	const goBack = () => {
		navigation.goBack()
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.wrapper}>
				<View>
					<Pressable onPress={goBack}>
						<Text>Back</Text>
					</Pressable>
				</View>
				<ResponseComponent question={question} answer={response} />
				<View></View>
			</View>
		</SafeAreaView>
	)
}

export default MessageDetailsScreen

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
})
