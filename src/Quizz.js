import React from "react"
import Question from "./Question"
import { decodeHTML } from "entities"

function Quizz() {
    const [quizzData, setQuizzData] = React.useState([])
    const [submit, setSubmit] = React.useState(false)
    const [resetQuizz, setResetQuizz] = React.useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setSubmit(true)
    }

    function handleResetQuizz() {
        setSubmit(false)
        setResetQuizz(prevResetQuiz => !prevResetQuiz)
    }

    function shuffleArray(array) {
        const arrayCopy = array
        const newArray = []
        while(arrayCopy.length>0) {
            let randomIndex = Math.floor(Math.random() * array.length)
            newArray.push(arrayCopy.splice(randomIndex, 1)[0])
        }
        return newArray
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
                .then(data => {
                    setQuizzData(() => {
                        return data.results.map((result, index) => {
                            return {
                                query : decodeHTML(result.question),
                                correctAnswer : decodeHTML(result.correct_answer),
                                answers : shuffleArray([...(result.incorrect_answers).map(answer => decodeHTML(answer)), result.correct_answer, ]),
                                userAnswer : "",
                                questionIndex : index,
                                correction : "correction-none"
                            }
                        })
                    })
                })
    }, [resetQuizz])

    function selectAnswer(e) {
        const targetQuestionIndex = JSON.parse(e.target.getAttribute("data-question-index"))
        const targetAnswerValue = e.target.value
        setQuizzData(prevQuizzData => {
            return prevQuizzData.map(prevData => {
                return prevData.questionIndex === targetQuestionIndex
                    ? {...prevData, userAnswer : targetAnswerValue}
                    : {...prevData}
            })
        })
    }

    const quizzElements = quizzData.map((data, index) => {
        return(
            <Question 
                data={data}
                key={index} 
                selectAnswer={selectAnswer}
                submit={submit}
            />
        )
    })

    return(
        <form className="quizz">
            {quizzElements}
            {submit 
                ? <button type="button" onClick={handleResetQuizz} className="quizz--submit-button">Reset Quizz</button>
                : <button type="button" onClick={handleSubmit} className="quizz--reset-button">Check answers</button>
            }
        </form>
    )
}

// form validation to ensure every question has one checked answer ?
// confetti when every answer s right

export default Quizz