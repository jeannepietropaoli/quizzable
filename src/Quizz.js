import React from "react"
import Question from "./Question"

function Quizz() {
    const [quizzData, setQuizzData] = React.useState([])

    function handleSubmit() {
        
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
                .then(data => {
                    setQuizzData(() => {
                        return data.results.map((result, index) => {
                            return {...result, questionNumber : `question${index}`}
                        })
                    })
                })
    }, [])

    console.log(quizzData)

    const quizzElements = quizzData.map((data, index) => {
        return(
            <Question 
                data={data}
                key={index} 
                number={index}
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