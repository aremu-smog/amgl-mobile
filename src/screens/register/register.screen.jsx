import { View, StyleSheet, Text, Pressable } from "react-native"
import { Button, Input } from "../../components"
import { useState } from "react"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"

const RegisterScreen = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	const navigation = useNavigation()

	const gotoLoginScreen = () => {
		navigation.navigate("Login")
	}

	const { register } = useAuthContext()

	const onRegister = async () => {
		await register(email, password, username)
	}
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient colors={["#ec1187", "#ff8d10"]} style={styles.container}>
				<Text style={styles.title}>Register</Text>
				<Input
					placeholder='Email Address'
					inputMode='email'
					autoCapitalize='none'
					onChangeText={setEmail}
					keyboardType='email-address'
				/>
				<Input
					placeholder='Username'
					autoCapitalize='none'
					onChangeText={setUsername}
				/>
				<Input
					placeholder='Password'
					inputMode='email'
					secureTextEntry={true}
					onChangeText={setPassword}
					keyboardType='email-address'
				/>
				<Button text='Sign up' onPress={onRegister} />
				<View style={styles.info}>
					<Text style={{ textAlign: "center" }}>Already have an account? </Text>
					<Pressable onPress={gotoLoginScreen}>
						<Text
							style={{
								fontWeight: "bold",
							}}>
							Login
						</Text>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 16,
	},
	container: {
		paddingHorizontal: 20,
		justifyContent: "center",
		flex: 1,
	},

	info: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
	},
})

export default RegisterScreen
