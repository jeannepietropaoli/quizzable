import React from "react"
import Question from "./Question"
import { decodeHTML } from "entities"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"
import decode from "html-entities-decoder"


function Quizz() {
    const [quizzData, setQuizzData] = React.useState([])
    const [submit, setSubmit] = React.useState(false)
    const [resetQuizz, setResetQuizz] = React.useState(false)
    const [score, setScore] = React.useState(0)

    function countFinalScore() {
        quizzData.forEach(data => {
            if(data.correctAnswer === data.userAnswer)
                setScore(prevScore => prevScore + 1)
        })
    }

    function handleSubmit(e) {
        countFinalScore()
        setSubmit(true)
    }

    function handleResetQuizz() {
        setSubmit(false)
        setScore(0)
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
                                query : decode(result.question),
                                correctAnswer : decode(result.correct_answer),
                                answers : shuffleArray([...(result.incorrect_answers).map(answer => decode(answer)), result.correct_answer, ]),
                                userAnswer : "",
                                id : nanoid(),
                                questionIndex : index,
                            }
                        })
                    })
                })
    }, [resetQuizz])

    function selectAnswer(e, id) {
        const targetAnswerValue = e.target.value
        setQuizzData(prevQuizzData => {
            return prevQuizzData.map(prevData => {
                return prevData.id === id
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
                selectAnswer={(e) => selectAnswer(e, data.id)}
                submit={submit}
            />
        )
    })

    function getScoreMeesage() {
        if(score === 5)
            return "Congrats, all your answers are right ! Good job !"
        else if (score === 0)
            return "No good answer, better luck next time !"
        else 
           return `You scored ${score} points`
    }

    return(
        <form className="quizz">
            {quizzElements}
            {submit && 
                <div className="quizz--result-container">
                    <button type="button" onClick={handleResetQuizz} className="quizz--submit-button">Play again</button>
                    <span className="quizz--score">{getScoreMeesage()}</span>
                </div>
            }
            {submit && score === quizzData.length && <Confetti />}
            {!submit && <button type="button" onClick={handleSubmit} className="quizz--reset-button">Check answers</button>}
        </form>
    )
}

// form validation to ensure every question has one checked answer ?

export default Quizz