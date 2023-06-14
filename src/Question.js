import React from "react";

function Question(props) {
    const answerElements = props.data.answers.map((answer, index) => {
        function correctAnswer() {
            if(props.submit) {
                const isAnswerChecked = answer === props.data.userAnswer
                if (props.data.correctAnswer === answer) return "good-answer"
                else if(isAnswerChecked && props.data.correctAnswer !== answer) return("wrong-answer")
                else return("neutral")
            }
            else return "neutral"
        }

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
                className={`answer--label ${props.submit ? "correction-visible" : "correction-hidden"} ${correctAnswer()}`}
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