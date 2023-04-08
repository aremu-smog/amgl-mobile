import { createContext, useContext, useState, useEffect } from "react"

import { firebaseInitialization } from "../api/firebase"
import { supabaseApp } from "../api/supabase"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const [currentSession, setCurrentSession] = useState(null)

	const getUserDataFromSession = session => {
		setCurrentSession(session)
		const { user } = session
		const { email, user_metadata } = user
		const { username } = user_metadata
		setUser({
			email,
			username,
		})
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

	console.log({ currentSession })
	const login = async (email, password) => {
		const { error } = await supabaseApp.auth.signInWithPassword({
			email,
			password,
		})

		if (data) {
			const { user } = data
			const { email } = user
			setUser({
				email,
			})
			console.log(data)
		}

		if (error) {
			console.error(error)
		}
	}

	const register = async (email, password, username) => {
		const { data, error } = await supabaseApp.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		})

		if (data) {
			console.log({ data })
		}

		if (error) {
			console.error(error)
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
