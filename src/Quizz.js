import React from "react"
import { decodeHTML } from "entities"
import Question from "./Question"

function Quizz() {
    const [quizzData, setQuizzData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
                .then(data => setQuizzData(data.results))
    }, [])

    const quizzElements = quizzData.map((data, index) => {
        const query = decodeHTML(data.question)
        const incorrectAnswers = data.incorrect_answers.map(answer => decodeHTML(answer))
        const correctAnswer = decodeHTML(data.correct_answer)

        return(
            <Question key={index} query={query} incorrectAnswers={incorrectAnswers} correctAnswer={correctAnswer} num={index} />
        )
    })

    return(
        <div className="quizz">
            {quizzElements}
        </div>
    )
}

export default Quizz