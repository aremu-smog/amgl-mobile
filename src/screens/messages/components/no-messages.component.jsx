import { View, Text, Image } from "react-native"
import { Button } from "@/components"
import { useNavigation } from "@react-navigation/native"
import { SCREEN_NAMES } from "@/screens/names"

const loveIconSrc = require("@/assets/love-letter.png")
const NoMessages = () => {
	const navigation = useNavigation()
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				padding: 30,
			}}>
			<View
				style={{
					margin: 20,
					borderRadius: 30,
					height: 100,
					width: 100,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgba(0, 0, 0, 0.1)",
				}}>
				<Image
					source={loveIconSrc}
					style={{
						width: 60,
						height: 60,
						opacity: 0.7,
					}}
				/>
			</View>
			<Text style={{ marginBottom: 20 }}>No messages found</Text>
			<Button
				text='Share links'
				onPress={() => navigation.navigate(SCREEN_NAMES.PLAY)}
				style={{ width: "100%", marginBottom: 30 }}
			/>
		</View>
	)
}
export default NoMessages
