import { View, StyleSheet, Text, Pressable } from "react-native"
import { Button, Input } from "@/components"
import { useAuthContext } from "@/context/auth.context"
import { LinearGradient } from "expo-linear-gradient"
import { Formik } from "formik"
import * as Yup from "yup"
import { SCREEN_NAMES } from "../names"
import { Fragment } from "react"

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.required("Please enter your email"),
	password: Yup.string()
		.min(3, "Too short!")
		.required("Please enter your password"),
})
const LoginScreen = ({ navigation }) => {
	const { login, user, setIsTemporarilyLoggedOut } = useAuthContext()

	const isLoggedIn = Boolean(user?.email)

	const navigateToRegisterScreen = () => {
		navigation.navigate(SCREEN_NAMES.REGISTER)
	}

	const title = isLoggedIn ? `Hi, ${user?.username} 👋` : " Welcome back"

	return (
		<Formik
			initialValues={{ password: "", email: "" }}
			validateOnChange={true}
			{...(!isLoggedIn && { validationSchema: loginSchema })}
			onSubmit={async values => {
				if (isLoggedIn) {
					setIsTemporarilyLoggedOut(false)
					return
				}
				const { email, password } = values

				try {
					await login(email, password)
				} catch (e) {
					console.warn(e)
				}
			}}>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				touched,
				errors,
				isValid,
			}) => (
				<LinearGradient
					colors={["#ec1187", "#ff8d10"]}
					style={styles.container}>
					<Text style={styles.title}>{title}</Text>

					{!isLoggedIn && (
						<Fragment>
							<Input
								placeholder='Email Address'
								inputMode='email'
								autoCapitalize='none'
								onBlur={handleBlur("email")}
								onChangeText={handleChange("email")}
								keyboardType='email-address'
								errorMessage={errors.email && touched.email ? errors.email : ""}
							/>
							<Input
								placeholder='Password'
								autoCapitalize='none'
								onBlur={handleBlur("password")}
								onChangeText={handleChange("password")}
								inputMode='text'
								secureTextEntry={true}
								errorMessage={
									errors.password && touched.password ? errors.password : ""
								}
							/>
						</Fragment>
					)}

					<Button
						text={isLoggedIn ? "Back to App" : "Login"}
						onPress={handleSubmit}
						isLoading={isSubmitting && isValid}
						style={{
							...(isLoggedIn && { marginTop: 16 }),
						}}
					/>
					{!isLoggedIn && (
						<View style={styles.info}>
							<Text style={{ textAlign: "center", justifyContent: "center" }}>
								Don't have an account yet?{" "}
							</Text>
							<Pressable onPress={navigateToRegisterScreen} hitSlop={5}>
								<Text
									style={{
										fontWeight: "bold",
									}}>
									Register
								</Text>
							</Pressable>
						</View>
					)}
				</LinearGradient>
			)}
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

export default LoginScreen
