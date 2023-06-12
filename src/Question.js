import React from "react";

function Question(props) {
    function shuffleArray(array) {
        const arrayCopy = array
        const newArray = []
        while(arrayCopy.length>0) {
            let randomIndex = Math.floor(Math.random() * array.length)
            newArray.push(arrayCopy.splice(randomIndex, 1)[0])
        }
        return newArray
    }

    const [answers, setAnswers] = React.useState([...props.incorrectAnswers, props.correctAnswer])

    React.useEffect(() => {
        setAnswers(shuffleArray(answers))
    }, [])

    const answerElements = answers.map((answer, index) => {
        return (
            <div className="answer" key={index}>
            <input type="radio" id={`question${props.num}_answer${index}`} name={`question${props.num}`} />
            <label htmlFor={`question${props.num}_answer${index}`} className="answer--label">{answer}</label>
            </div>
        )
    })

    return(
        <div>
            <h4 className="query">{props.query}</h4>
            <div className="answers">{answerElements}</div>
        </div>
    )
}

export default Question