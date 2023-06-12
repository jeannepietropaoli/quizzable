import React from "react"
import Quizz from "./Quizz";
import Home from "./Home";
import backgroundTopCorner from "./assets/background-top-corner.png"
import backgroundBottomCorner from "./assets/background-bottom-corner.png"

function App() {
  const [startQuizz, setStartQuizz] = React.useState(false)

  function handleStartQuizz() {
    setStartQuizz(true)
  }

  return (
    <div className="app">
      <img className="background-top-corner" src={backgroundTopCorner} alt="top-corner shape" />
      <img className="background-bottom-corner" src={backgroundBottomCorner} alt="bottom-corner shape" />
      {startQuizz ? <Quizz /> : <Home handleStartQuizz={handleStartQuizz} />}
    </div>
  );
}

export default App;
