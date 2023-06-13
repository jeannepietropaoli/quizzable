import React from "react";

function Question(props) {
    const answerElements = props.data.answers.map((answer, index) => {
        return (
            <div className="answer" key={index}>
            <input
                type="radio" 
                value={answer}
                name={`question${props.data.questionIndex}`}
                id={`question${props.data.questionIndex}_answer${index}`}
                data-question-index={props.data.questionIndex}
                onChange={props.selectAnswer}
                checked={props.data.userAnswer === answer}
            />
            <label 
                htmlFor={`question${props.data.questionIndex}_answer${index}`} 
                className="answer--label"
            >
                {answer}
            </label>
            </div>
        )
    })

    return(
        <div className="question">
            <h4 className="query">{props.data.query}</h4>
            <div className="answers">{answerElements}</div>
        </div>
    )
}

export default Question