import { View, Image, StyleSheet, Pressable, SafeAreaView } from "react-native"
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
				<View style={styles.header}>
					<Pressable onPress={goBack} style={{ padding: 5, marginRight: -10 }}>
						<Image
							source={require("../../../assets/close.png")}
							style={{
								width: 20,
								height: 20,
								opacity: 0.3,
							}}
						/>
					</Pressable>
				</View>
				<ResponseComponent question={question} answer={response} />
				<View
					style={{
						flex: 0.3,
					}}></View>
			</View>
		</SafeAreaView>
	)
}

export default MessageDetailsScreen

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		padding: 20,
	},
	wrapper: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
})
