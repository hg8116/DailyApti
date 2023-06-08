import { useState } from "react"
import PropTypes from "prop-types"

const Question = ({ question, options, answer }) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [feedback, setFeedback] = useState('')

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        if (option === answer) {
            setFeedback('Correct!')
        } else {
            setFeedback('Incorrect!')
        }
    }
    
    return (
        <div className="mcq-question">
            <h4>{question}</h4>
            <ul>
                {options.map((option) => (
                    <li
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className={selectedOption === option ? 'selected' : ''}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            {feedback && <p>{feedback}</p>}
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
}

export default Question
