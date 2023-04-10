import { View, StyleSheet, Text, Pressable } from "react-native"
import { Button, Input } from "../../components"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const { login } = useAuthContext()

	const onLogin = async () => {
		setIsLoading(true)
		try {
			await login(email, password)
		} catch (e) {
			console.warn(e)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateToRegisterScreen = () => {
		navigation.navigate("Register")
	}
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient colors={["#ec1187", "#ff8d10"]} style={styles.container}>
				<Text style={styles.title}>Welcome back</Text>
				<Input
					placeholder='Email Address'
					inputMode='email'
					autoCapitalize='none'
					onChangeText={setEmail}
					keyboardType='email-address'
				/>
				<Input
					placeholder='Password'
					autoCapitalize='none'
					inputMode='text'
					secureTextEntry={true}
					onChangeText={setPassword}
				/>
				<Button text='Login' onPress={onLogin} isLoading={isLoading} />
				<View style={styles.info}>
					<Text style={{ textAlign: "center", justifyContent: "center" }}>
						Don't have an account yet?
						<Pressable onPress={navigateToRegisterScreen}>
							<Text>Register</Text>
						</Pressable>
					</Text>
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
	},
})

export default LoginScreen
