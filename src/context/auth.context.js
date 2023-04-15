import { createContext, useContext, useState, useEffect } from "react"

import { firebaseInitialization } from "../api/firebase"
import { supabaseApp } from "../api/supabase"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isReadyToLogin, setIsReadyToLogin] = useState(false)

	const [currentSession, setCurrentSession] = useState(null)

	const getUserDataFromSession = async (session, loggedInUser) => {
		if (!currentSession) {
			setCurrentSession(session)
			const { user } = session ?? {}
			const { email, id } = loggedInUser ?? user ?? {}

			const { data, error } = await supabaseApp
				.from("user_alias")
				.select("name")
				.eq("user_id", id)

			if (data) {
				const userAlias = data[0]
				const username = userAlias.name

				setUser({
					email,
					username,
					id,
				})
			}

			if (error) {
				console.warn(error)
			}
		}
	}
	useEffect(() => {
		supabaseApp.auth.getSession().then(({ data: { session } }) => {
			getUserDataFromSession(session)
		})

		supabaseApp.auth.onAuthStateChange((e, session) => {
			if (session) {
				getUserDataFromSession(session)
			}
		})
	}, [])

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
