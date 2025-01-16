import React, { useCallback, useRef } from "react"
import { View, Text, Image } from "react-native"
import { useAuthContext } from "@/context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import Constants from "expo-constants"
import { useFocusEffect } from "@react-navigation/native"
import { FloatingText, LogoutButton } from "./components"

const profileImage = require("@/assets/profile.png")

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

const containerPadding = 20

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
						<FloatingText
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
					v{Constants.expoConfig.version}
				</Text>
			</View>
		</View>
	)
}

export default AccountScreen
