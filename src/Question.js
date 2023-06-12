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
            <div key={index}>
                <input type="radio" id={`answer${index}`} name={`question${props.num}`} />
                <label htmlFor={`answer${index}`}>{answer}</label>
            </div>
        )
    })

    return(
        <div>
            {props.query}
            {answerElements}
        </div>
    )
}

export default Question