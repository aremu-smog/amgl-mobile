import { createContext, useContext, useState } from "react"

const QuestionsContext = createContext()

const QuestionsContextProvider = ({ children }) => {
	const [questions, setQuestions] = useState([])
	return (
		<QuestionsContext.Provider
			value={{
				questions,
				setQuestions,
			}}>
			{children}
		</QuestionsContext.Provider>
	)
}

export const useQuestionsContext = () => {
	return useContext(QuestionsContext)
}

export default QuestionsContextProvider
