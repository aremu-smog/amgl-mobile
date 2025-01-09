import { View, StyleSheet, Text, Pressable } from "react-native"
import { Button, Input } from "@/components"
import { useAuthContext } from "@/context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import * as Yup from "yup"
import { SCREEN_NAMES } from "../names"

const registrationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please a enter a valid email")
		.trim()
		.required("Please enter your emaill"),
	username: Yup.string()
		.required("Please enter your username")
		.trim("No spaces allowed"),
	password: Yup.string()
		.required("Please enter your password")
		.min(3, "Password must be at least 3 characters long")
		.trim(),
})
const RegisterScreen = () => {
	const navigation = useNavigation()

	const gotoLoginScreen = () => {
		navigation.navigate(SCREEN_NAMES.LOGIN)
	}

	const { register } = useAuthContext()

	// const onRegister = async () => {
	// 	await register(email, password, username)
	// }
	return (
		<Formik
			initialValues={{ email: "", username: "", password: "" }}
			validateOnChange={true}
			validationSchema={registrationSchema}
			onSubmit={async values => {
				const { email, password, username } = values
				try {
					await register(email.trim(), password.trim(), username.trim())
				} catch (e) {
					console.warn(e.message)
				}
			}}>
			{({
				isSubmitting,
				isValid,
				touched,
				errors,
				handleSubmit,
				handleChange,
				handleBlur,
			}) => {
				return (
					<View style={{ flex: 1 }}>
						<LinearGradient
							colors={["#ec1187", "#ff8d10"]}
							style={styles.container}>
							<Text style={styles.title}>Register</Text>
							<Input
								placeholder='Email Address'
								inputMode='email'
								autoCapitalize='none'
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								keyboardType='email-address'
								errorMessage={
									errors?.email && touched?.email ? errors?.email : ""
								}
							/>
							<Input
								placeholder='Username'
								autoCapitalize='none'
								onChangeText={handleChange("username")}
								onBlur={handleBlur("username")}
								errorMessage={
									errors?.username && touched?.username ? errors?.username : ""
								}
							/>
							<Input
								placeholder='Password'
								inputMode='text'
								secureTextEntry={true}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								autoCapitalize='none'
								errorMessage={
									errors?.password && touched?.password ? errors?.password : ""
								}
							/>
							<Button
								text='Sign up'
								onPress={handleSubmit}
								isLoading={isSubmitting && isValid}
							/>
							<View style={styles.info}>
								<Text style={{ textAlign: "center" }}>
									Already have an account?{" "}
								</Text>
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
			}}
		</Formik>
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
