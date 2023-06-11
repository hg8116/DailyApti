import axios from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
})

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const count = 5
        const response = await api.get(`/questions/random/${count}`)
        const questionData = response.data
        setQuestions(questionData)
      } catch (error) {
        console.error("Failed to fetch questions", error)
      }
    }

    fetchQuestions()
  }, [])

  const handleOptionClick = (questionIndex, selectedOption) => {
    const correctOption = questions[questionIndex].answer.toLowerCase()
    const updatedSelectedOptions = [...selectedOptions]
    updatedSelectedOptions[questionIndex] = selectedOption
    setSelectedOptions(updatedSelectedOptions)

    if (selectedOption === correctOption) {
      console.log("Correct")
    } else {
      console.log("Incorrect")
    }
  }

  return (
    <div className="question-page">
      <h1>Question Page</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Q{index + 1}</h3>
          <p>{question.question}</p>
          <ol type="a">
            <li
              className={`${
                selectedOptions[index] === "a"
                  ? selectedOptions[index] === question.answer.toLowerCase()
                    ? "correct-option"
                    : "incorrect-option"
                  : ""
              }`}
              onClick={() => handleOptionClick(index, "a")}>
              {question.a}
            </li>
            <li
              className={`${
                selectedOptions[index] === "b"
                  ? selectedOptions[index] === question.answer.toLowerCase()
                    ? "correct-option"
                    : "incorrect-option"
                  : ""
              }`}
              onClick={() => handleOptionClick(index, "b")}>
              {question.b}
            </li>
            <li
              className={`${
                selectedOptions[index] === "c"
                  ? selectedOptions[index] === question.answer.toLowerCase()
                    ? "correct-option"
                    : "incorrect-option"
                  : ""
              }`}
              onClick={() => handleOptionClick(index, "c")}>
              {question.c}
            </li>
            <li
              className={`${
                selectedOptions[index] === "d"
                  ? selectedOptions[index] === question.answer.toLowerCase()
                    ? "correct-option"
                    : "incorrect-option"
                  : ""
              }`}
              onClick={() => handleOptionClick(index, "d")}>
              {question.d}
            </li>
          </ol>
        </div>
      ))}
    </div>
  )
}

export default Questions
