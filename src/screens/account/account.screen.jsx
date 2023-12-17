import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, Image } from "react-native"
import { Button } from "../../components"
import { supabaseApp } from "../../api/supabase"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import Constants from "expo-constants"
import { useFocusEffect } from "@react-navigation/native"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
	withDelay,
	runOnJS,
} from "react-native-reanimated"

const profileImage = require("../../../assets/profile.png")

const fallingElements = [
	"rizzme",
	"confessions",
	"friendship",
	"anonymous",
	"deep secrets",
	"shoot your shot",
]
const AccountScreen = () => {
	const { user } = useAuthContext()

	return (
		<View
			style={{
				padding: 20,
				flex: 1,
				justifyContent: "space-between",
			}}>
			<View>
				<View
					style={{
						alignSelf: "center",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Image
						source={profileImage}
						style={{ width: 120, height: 80 }}
						resizeMode='contain'
					/>
					<Text
						style={{
							fontSize: 14,
							fontWeight: "600",
							textTransform: "uppercase",
							textAlign: "center",
							// marginVertical: 20,
						}}>
						{user?.username}
					</Text>
				</View>
			</View>
			<View style={{ flex: 1, marginVertical: 24 }}>
				<LinearGradient
					colors={["#ec1187", "#ff8d10"]}
					style={{
						flex: 1,
						borderRadius: 20,
						position: "relative",
						overflow: "hidden",
					}}>
					{fallingElements.map((item, index) => (
						<FloatingElement key={item} text={item} delay={index} />
					))}
				</LinearGradient>
			</View>
			<View>
				<LogoutButton />
				<Text style={{ opacity: 0.5, textAlign: "center" }}>
					v{Constants.manifest.version}
				</Text>
			</View>
		</View>
	)
}

const generateRandomPosition = () => {
	return Math.floor(Math.random() * 300)
}
const generateRandomAngle = Math.floor(Math.random() * 15)
const FloatingElement = ({ text, delay }) => {
	const [randomXPosition, setRandomXPosition] = useState(generateRandomPosition)
	const [randomRotationValue, setRandomRotationValue] =
		useState(generateRandomAngle)

	const textRef = useRef(null)

	const translateY = useSharedValue(-200)
	const OFFSET = 500

	const style = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	useFocusEffect(
		useCallback(() => {
			const textElement = textRef.current
			let textElementWidth = 0
			textElement.measure((x, y, width, height) => {
				textElementWidth = width
			})

			const halfWidth = textElementWidth / 2

			const detectEdgePosition = () => {
				const position = generateRandomPosition()
				if (position > 150) {
					return position - halfWidth
				}

				return position
			}

			translateY.value = withRepeat(
				withDelay(
					delay * 500,
					withTiming(
						OFFSET,
						{
							duration: 7500,
							easing: Easing.linear,
						},
						finished => {
							if (finished) {
								runOnJS(setRandomXPosition)(detectEdgePosition)
								runOnJS(setRandomRotationValue)(generateRandomAngle)
							}
						}
					)
				),
				-1
			)
		}, [])
	)

	return (
		<Animated.View style={[style]}>
			<Text
				ref={textRef}
				style={{
					backgroundColor: "white",
					borderRadius: 200,
					paddingVertical: 4,
					paddingHorizontal: 12,
					fontSize: 24,
					lineHeight: 24,
					fontWeight: "bold",
					position: "absolute",
					transform: [
						{ rotate: `${randomRotationValue}deg` },
						{ translateX: randomXPosition },
					],
				}}>
				{text}
			</Text>
		</Animated.View>
	)
}

const LogoutButton = () => {
	const [isLoading, setIsLoading] = useState(false)

	const logout = async () => {
		setIsLoading(true)
		const { error } = await supabaseApp.auth.signOut()
		if (error) {
			console.error(e.message)
		}
		setIsLoading(false)
	}
	return (
		<Button
			text='Log out'
			isLoading={isLoading}
			onPress={logout}
			style={{ marginBottom: 20 }}
		/>
	)
}

export default AccountScreen
