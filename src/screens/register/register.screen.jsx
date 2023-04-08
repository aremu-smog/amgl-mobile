import { View, StyleSheet, Text } from "react-native"
import { Button, Input } from "../../components"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../context/auth.context"
import { LinearGradient } from "expo-linear-gradient"

const RegisterScreen = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	const { user, register } = useAuthContext()

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
					<Text style={{ textAlign: "center" }}>
						Already have an account? Login
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

export default RegisterScreen
