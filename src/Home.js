import React from "react";

function Home(props) {
    return(
        <div className="home">
            <h1 className="home--title">Quizzable</h1>
            <h3 className="home--description">Fun little quizz to test your skilzz</h3>
            <button className="home--start-button" onClick={props.handleStartQuizz}>Start quizz</button>
        </div>
    )
}

export default Home