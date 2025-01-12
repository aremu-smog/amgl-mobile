import { Fragment, useState } from "react"
import { supabaseApp } from "@/api/supabase"
import { Button } from "@/components"
import { useAuthContext } from "@/context/auth.context"
import { StyleSheet } from "react-native"

export const LogoutButton = () => {
	const [isLoading, setIsLoading] = useState(false)

	const { setIsTemporarilyLoggedOut } = useAuthContext()
	const temporarilyLogout = () => {
		setIsTemporarilyLoggedOut(true)
	}
	const logout = async () => {
		setIsLoading(true)
		const { error } = await supabaseApp.auth.signOut()
		if (error) {
			console.error(e.message)
		}
		setIsLoading(false)
	}
	return (
		<Fragment>
			<Button
				text='Log out'
				isLoading={isLoading}
				onPress={logout}
				style={{ marginBottom: 20 }}
			/>
			<Button
				text='Lock App'
				isLoading={isLoading}
				onPress={temporarilyLogout}
				style={styles.tempLogoutButton}
				textStyle={styles.tempLogoutButtonText}
			/>
		</Fragment>
	)
}

const styles = StyleSheet.create({
	tempLogoutButton: {
		marginBottom: 20,
		backgroundColor: "transparent",
		paddingVertical: 8,
	},
	tempLogoutButtonText: {
		color: "black",
		fontWeight: 400,
		fontSize: 14,
	},
})
