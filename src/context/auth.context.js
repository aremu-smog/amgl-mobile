import { createContext, useContext, useState, useEffect } from "react"

import { firebaseInitialization } from "../api/firebase"
import { supabaseApp } from "../api/supabase"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isReadyToLogin, setIsReadyToLogin] = useState(false)

	const [currentSession, setCurrentSession] = useState(null)

	useEffect(() => {
		supabaseApp.auth.onAuthStateChange(async (e, session) => {
			setCurrentSession(session)
		})
	}, [])

	useEffect(() => {
		const { user } = currentSession ?? {}
		const { email, id } = user ?? {}

		setUser({
			email,
			id,
			username: "smogdaddy",
		})

		const fetchUserDetails = async () => {
			const { data, error } = await supabaseApp
				.from("user_alias")
				.select("name")
				.eq("user_id", id)

			if (data) {
				const userAlias = data[0]
				const username = userAlias?.name

				setUser(prevUser => {
					return { ...prevUser, username }
				})
			}

			if (error) {
				console.warn(error.message)
			}
		}

		fetchUserDetails()
	}, [currentSession])

	const login = async (email, password) => {
		const { data, error } = await supabaseApp.auth.signInWithPassword({
			email,
			password,
		})

		if (data) {
			setIsReadyToLogin(true)
		}
		if (error) {
			console.error(error)
		}
	}

	const register = async (email, password, username) => {
		const { data: signUpData, error: signUpError } =
			await supabaseApp.auth.signUp({
				email,
				password,
			})

		if (signUpData) {
			const { user } = signUpData
			const { data, error } = await supabaseApp
				.from("user_alias")
				.insert({
					user_id: user.id,
					name: username,
				})
				.select()

			if (data) {
			}
			if (error) {
				console.error(error)
			}
		}

		if (signUpError) {
			console.error(signUpError)
		}
	}
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!currentSession,
				login,
				register,
				user,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}
