import Question from "../components/Question"
import { useEffect, useState } from "react"
import data from '../../../ques-scrape/data.json'

const Questions = () => {
  
  const [randomQuestions, setRandomQuestions] = useState([])
  useEffect(() => {
    const getRandomQuestions = () => {
      const shuffledQuestions = shuffleArray(data)
      const selectedQuestions = shuffledQuestions.slice(0, 5)
      setRandomQuestions(selectedQuestions)
    }

    getRandomQuestions()
  }, [])

  const shuffleArray = (array) => {
    const newArray = [...array]
    for(let i=newArray.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }

    return newArray
  }


  return (
    <div className="question-page">
    <h1>Question Page</h1>
    {randomQuestions.map((question, index) => {
      let answer = '';
      if (question.answer === 'A') {
        answer = question.a;
      } else if (question.answer === 'B') {
        answer = question.b;
      } else if (question.answer === 'C') {
        answer = question.c;
      } else if (question.answer === 'D') {
        answer = question.d;
      }
      return (
        <Question
          key={index}
          question={question.question}
          options={[question.a, question.b, question.c, question.d]}
          answer={answer}
        />
      );
    })}
  </div>
  )
}

export default Questions