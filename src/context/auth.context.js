import { createContext, useContext, useState, useEffect, useRef } from "react"

import { supabaseApp } from "@/api/supabase"
import { Alert, AppState } from "react-native"

const AuthContext = createContext()

export const AuthContextProvider = ({ setIsAppReady, children }) => {
	const [user, setUser] = useState(null)
	const [isTemporarilyLoggedOut, setIsTemporarilyLoggedOut] = useState(false)
	const appState = useRef(AppState.currentState)
	const currentRoute = useRef(null)

	useEffect(() => {
		AppState.addEventListener("change", nextAppState => {
			if (
				(appState.current === "inactive") |
				(appState.current === "background")
			) {
				setIsTemporarilyLoggedOut(true)
			}
			appState.current = nextAppState
		})
	}, [])
	const [currentSession, setCurrentSession] = useState(null)

	useEffect(() => {
		supabaseApp.auth.onAuthStateChange(async (e, session) => {
			if (session) {
				setCurrentSession(session)
				setIsTemporarilyLoggedOut(false)
			}
			setIsAppReady(true)
		})
	}, [])

	useEffect(() => {
		const { user } = currentSession ?? {}
		const { email, id } = user ?? {}

		setUser({
			email,
			id,
		})

		const fetchUserDetails = async () => {
			const { data, error } = await supabaseApp
				.from("user_alias")
				.select()
				.eq("user_id", id)

			if (data) {
				const userAlias = data[0]
				const username = userAlias?.name
				const push_notification_enabled = userAlias?.push_notification_enabled

				setUser(prevUser => {
					return { ...prevUser, username, push_notification_enabled }
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

		if (error) {
			Alert.alert(
				isTemporarilyLoggedOut
					? "Log in failed, kindly try again"
					: "Incorrect email/password, please try again"
			)
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
						user_id: user?.id,
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
				isAuthenticated: !!currentSession && !isTemporarilyLoggedOut,
				login,
				register,
				user,
				setUser,
				setIsTemporarilyLoggedOut,
				isTemporarilyLoggedOut,
				currentRoute,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}
