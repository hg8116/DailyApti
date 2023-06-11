import axios from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
})

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState({});
const [isCorrect, setIsCorrect] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const count = 5
        const response = await api.get(`/questions/random/${count}}`)
        const questionData = response.data
        setQuestions(questionData)
      } catch (error) {
        console.error("Failed to fetch questions", error)
      }
    }

    fetchQuestions()
    // console.log(questions)
  }, [])

  const handleOptionClick = (questionIndex, selectedOption) => {
    const question = questions[questionIndex];
    const selectedOptionLower = selectedOption.toLowerCase();
    const answerLower = question.answer.toLowerCase();
    setSelectedOption(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionIndex]: selectedOptionLower,
    }));
    setIsCorrect(prevIsCorrect => ({
      ...prevIsCorrect,
      [questionIndex]: selectedOptionLower === answerLower,
      
    }));
    console.log(selectedOption)
    console.log(isCorrect)
  };
  

  return (
    <div className="question-page">
      <h1>Question Page</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Q{index + 1}</h3>
          <p>{question.question}</p>
          <ul>
            <li onClick={() => handleOptionClick(index, "a")} className={selectedOption[index]==="a" ? (isCorrect[index] === "a" ? "correct" : "incorrect") : ""}>{question.a}</li>
            <li onClick={() => handleOptionClick(index, "b")} className={selectedOption[index]==="b" ? (isCorrect[index] === "b" ? "correct" : "incorrect") : ""}>{question.b}</li>
            <li onClick={() => handleOptionClick(index, "c")} className={selectedOption[index]==="c" ? (isCorrect[index] === "c" ? "correct" : "incorrect") : ""}>{question.c}</li>
            <li onClick={() => handleOptionClick(index, "d")} className={selectedOption[index]==="d" ? (isCorrect[index] === "d" ? "correct" : "incorrect") : ""}>{question.d}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Questions
