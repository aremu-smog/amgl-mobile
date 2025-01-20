import React, { useEffect, useState } from "react"
import { Text, Dimensions } from "react-native"

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
	withDelay,
	runOnJS,
} from "react-native-reanimated"

const screenWidth = Dimensions.get("window").width

export const FloatingText = ({ text, delay, containerHeight }) => {
	const [randomRotationValue, setRandomRotationValue] =
		useState(generateRandomAngle)
	const [randomXPosition, setRandomXPosition] = useState(
		generateRandomPosition()
	)

	const positionTop = useSharedValue(-200)
	const OFFSET = containerHeight + 200

	const updateRandomValues = () => {
		const randomAngle = generateRandomAngle()
		const randomXPosition = generateRandomPosition()
		setRandomRotationValue(randomAngle)
		setRandomXPosition(randomXPosition)
	}
	const style = useAnimatedStyle(() => ({
		top: positionTop.value,
	}))

	const DELAY = delay * 1000

	useEffect(() => {
		positionTop.value = withDelay(
			DELAY,
			withRepeat(
				withTiming(
					OFFSET,
					{
						duration: 7500,
						easing: Easing.linear,
					},
					finished => {
						if (finished) {
							runOnJS(updateRandomValues)()
						}
					}
				),
				-1
			)
		)
	}, [])

	return (
		<Animated.View
			style={[
				style,
				{
					borderRadius: 30,
					backgroundColor: "white",
					position: "absolute",
					padding: 10,
					paddingHorizontal: 12,
					transform: [
						{ rotateZ: `${randomRotationValue}deg` },
						{ translateX: randomXPosition },
					],
				},
			]}>
			<Text
				style={{
					fontSize: 24,
					lineHeight: 24,
					fontWeight: "bold",
					flexGrow: 0,
					textAlign: "center",
				}}>
				{text}
			</Text>
		</Animated.View>
	)
}

const generateRandomPosition = () => {
	return Math.floor(Math.random() * (screenWidth / 2))
}
const generateRandomAngle = () => {
	return Math.floor(Math.random() * 31) - 15
}
