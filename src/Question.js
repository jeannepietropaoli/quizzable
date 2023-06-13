import React from "react";
import { decodeHTML } from "entities"

function Question(props) {
    const query = decodeHTML(props.data.question)
    const incorrectAnswers = props.data.incorrect_answers.map(answer => decodeHTML(answer))
    const correctAnswer = decodeHTML(props.data.correct_answer)
    const [answers, setAnswers] = React.useState([...incorrectAnswers, correctAnswer])
    const [userAnswer, setUserAnswer] = React.useState("")

    React.useEffect(() => {
        setAnswers(prevAnswers => shuffleArray(prevAnswers))
    }, [])

    function shuffleArray(array) {
        const arrayCopy = array
        const newArray = []
        while(arrayCopy.length>0) {
            let randomIndex = Math.floor(Math.random() * array.length)
            newArray.push(arrayCopy.splice(randomIndex, 1)[0])
        }
        return newArray
    }
    console.log(query + userAnswer)

    function selectAnswer(e) {
        setUserAnswer(e.target.value)
    }

    // const [answers, setAnswers] = React.useState([...props.incorrectAnswers, props.correctAnswer])

    /* React.useEffect(() => {
        setAnswers(shuffleArray(answers))
    }, []) */

    /* function selectAnswer(event) {
        console.log(event.target)
   
        setQuizzData(prevFormData => {
            return prevFormData.map((question, index) => {
                if(`question${index}` === event.target.name ) {
                    question.
                }
                else {
                    return {...question}
                }
                return `question${index}` === event.target.name 
                    ? {...question, [question.selected] : event.target.value}
                    : {...question}
            })
        })
    } */

    const answerElements = answers.map((answer, index) => {
        return (
            <div className="answer" key={index}>
            <input
                type="radio" 
                value={answer}
                name={`question${props.number}`} 
                id={`question${props.number}_answer${index}`}
                onChange={selectAnswer}
                checked={userAnswer === answer}
                // checked = {answer === props.selectedAnswer}
                // checked={answer === props.selectedAnswer}
            />
            <label 
                htmlFor={`question${props.number}_answer${index}`} 
                className="answer--label"
            >
                {answer}
            </label>
            </div>
        )
    })

    return(
        <div className="question">
            <h4 className="query">{query}</h4>
            <div className="answers">{answerElements}</div>
        </div>
    )
}

export default Question