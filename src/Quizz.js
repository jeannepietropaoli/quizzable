import React from "react"
import Question from "./Question"
import { decodeHTML } from "entities"

function Quizz() {
    const [quizzData, setQuizzData] = React.useState([])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(quizzElements)
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
                                questionIndex : index
                            }
                        })
                    })
                })
    }, [])

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
            />
        )
    })

    return(
        <form className="quizz" onSubmit={handleSubmit}>
            {quizzElements}
            <button className="quizz--submit-button">Check answers</button>
        </form>
    )
}

export default Quizz