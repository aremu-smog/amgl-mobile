import { View, Image, StyleSheet, Pressable, SafeAreaView } from "react-native"
import { ResponseComponent } from "./components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button } from "../../components"
import { captureRef } from "react-native-view-shot"
import { useRef, useState } from "react"
import * as MediaLibrary from "expo-media-library"

import { useToast } from "../../hooks"

const MessageDetailsScreen = () => {
	const route = useRoute()
	const navigation = useNavigation()
	const [isSavingImage, setIsSavingImage] = useState(false)

	const { showToast } = useToast()
	const ref = useRef()

	const { params = {} } = route

	const { question, response } = params
	const goBack = () => {
		navigation.goBack()
	}

	const downloadImage = () => {
		setIsSavingImage(true)

		/**
		 * Artificial delay to remove uneeded elements from image
		 */
		setTimeout(() => {
			captureRef(ref, {
				format: "png",
				quality: 0.8,
			})
				.then(async uri => {
					MediaLibrary.saveToLibraryAsync(uri)
						.then(() => {
							showToast("Image saved to gallery", 2000)
						})
						.catch(e => {
							console.log("Error saving image", e.message)
						})
				})
				.catch(e => {
					console.log("Error occured", e.message)
				})
				.finally(() => {
					setIsSavingImage(false)
				})
		}, 500)
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.wrapper} ref={ref}>
				<View style={styles.header}>
					{!isSavingImage && (
						<Pressable
							onPress={goBack}
							style={{ padding: 5, marginRight: -10 }}>
							<Image
								source={require("../../../assets/close.png")}
								style={{
									width: 20,
									height: 20,
									opacity: 0.3,
								}}
							/>
						</Pressable>
					)}
				</View>
				<ResponseComponent question={question} answer={response} />
				<View
					style={{
						flex: 0.3,
					}}>
					{!isSavingImage && <Button text='Download' onPress={downloadImage} />}
				</View>
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
		backgroundColor: "#fff",
	},
})
