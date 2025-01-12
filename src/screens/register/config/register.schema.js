import * as Yup from "yup"

export const registrationSchema = Yup.object().shape({
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
