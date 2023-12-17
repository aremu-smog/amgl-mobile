import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, Image, Dimensions } from "react-native"
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
	"bestie bestie",
	"deep secrets",
	"shoot your shot",
	"best friends 4 life",
	"bants n cruise",
	"dey play",
	"safe space?",
]
const screenWidth = Dimensions.get("window").width
const containerPadding = 20
console.log({ screenWidth })
const rightEdgeOfGradient = screenWidth - containerPadding * 2
const leftOfEdgeOfGradient = 0
const AccountScreen = () => {
	const { user } = useAuthContext()
	const gradientRef = useRef(null)
	const containerHeight = useRef(464)

	useFocusEffect(
		useCallback(() => {
			gradientRef.current.measure((x, y, width, height) => {
				containerHeight.current = height
			})
		}, [])
	)

	return (
		<View
			style={{
				padding: containerPadding,
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
			<View style={{ flex: 1, marginVertical: 24 }} ref={gradientRef}>
				<LinearGradient
					colors={["#ec1187", "#ff8d10"]}
					style={{
						flex: 1,
						borderRadius: 20,
						position: "relative",
						overflow: "hidden",
					}}>
					{fallingElements.map((item, index) => (
						<FloatingElement
							key={`${item.replace(/\s/g, "-")}${index}`}
							text={item}
							delay={index}
							containerHeight={containerHeight.current}
						/>
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
	return Math.floor(Math.random() * (screenWidth / 2))
}
const generateRandomAngle = () => Math.floor(Math.random() * 15)
const FloatingElement = ({ text, delay, containerHeight }) => {
	const [randomXPosition, setRandomXPosition] = useState(generateRandomPosition)
	const [randomRotationValue, setRandomRotationValue] =
		useState(generateRandomAngle)

	const textRef = useRef(null)
	const textElementWidth = useRef(0)

	const translateY = useSharedValue(-200)
	const OFFSET = containerHeight

	const style = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	useFocusEffect(
		useCallback(() => {
			const textElement = textRef.current
			textElement.measure((x, y, width, height) => {
				textElementWidth.current = width
			})
		}, [])
	)

	const DELAY = delay * 500

	useFocusEffect(
		useCallback(() => {
			const detectEdgePosition = () => {
				const halfWidth = textElementWidth.current / 2
				const position = generateRandomPosition()

				const distanceFromRightEdge =
					rightEdgeOfGradient - position + containerPadding

				// if (
				// 	position > rightEdgeOfGradient ||
				// 	distanceFromRightEdge < halfWidth
				// ) {
				// 	return rightEdgeOfGradient - halfWidth
				// }

				return position
			}

			translateY.value = withRepeat(
				withDelay(
					DELAY,
					withTiming(
						OFFSET,
						{
							duration: 7500,
							easing: Easing.linear,
						},
						finished => {
							if (finished) {
								runOnJS(setRandomRotationValue)(generateRandomAngle)
								runOnJS(setRandomXPosition)(detectEdgePosition)
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
					flexGrow: 0,
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
