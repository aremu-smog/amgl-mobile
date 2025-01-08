import { useState } from "react"
import { supabaseApp } from "@/api/supabase"
import { Button } from "@/components"

export const LogoutButton = () => {
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
