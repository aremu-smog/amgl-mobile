import { createContext, useContext, useState, useEffect } from "react"

import { supabaseApp } from "../api/supabase"
import { Alert } from "react-native"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAppReady, setIsAppReady] = useState(false)

	const [currentSession, setCurrentSession] = useState(null)

	useEffect(() => {
		supabaseApp.auth.onAuthStateChange(async (e, session) => {
			setCurrentSession(session)
			setIsAppReady(true)
		})
	}, [])

	useEffect(() => {
		const { user } = currentSession ?? {}

		const { email, id } = user ?? {}

		setUser({
			email,
			id,
			username: "",
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
				console.error(error.message)
			}
		}

		if (currentSession) {
			fetchUserDetails()
		}
	}, [currentSession])

	const login = async (email, password) => {
		const { data, error } = await supabaseApp.auth.signInWithPassword({
			email,
			password,
		})

		if (data) {
		}
		if (error) {
			Alert.alert("Incorrect email/password, please try again")
			console.error(error)
		}
	}

	/**
	 *
	 * @param {string} email
	 * @param {string} password
	 * @param {string} username
	 */
	const register = async (email, password, username) => {
		const { data: userAliasData, error: userAliasError } = await supabaseApp
			.from("user_alias")
			.select("name")
			.eq("name", username)

		if (userAliasData.length > 0) {
			Alert.alert("Username taken, please try something else")
		} else {
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
					setUser(prevUser => {
						return { ...prevUser, username }
					})
				}
				if (error) {
					console.error(error)
				}
			}

			if (signUpError) {
				console.error(signUpError)
			}
		}
	}
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!currentSession,
				login,
				register,
				user,
				isAppReady,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}
