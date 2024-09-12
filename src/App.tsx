import { useState } from "react";
import "./App.css";
//import confetti from "https://cdn.skypack.dev/canvas-confetti";

const phrases = ["No", "Seriously?", "Stop joking"];
const questions = [
  {
    question: "Which one is a primary colour",
    options: ["Red", "Purple", "Green", "Violet"],
    answer: "Red",
  },
  {
    question: "What is the Capital of England",
    options: ["Petoria", "Paris", "London", "Namek"],
    answer: "London",
  },
  {
    question: "How many continents are there on Earth?",
    options: ["10", "3", "600", "7"],
    answer: "7",
  },
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPressed, setNoPressed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(true);
  const yesButtonSize = noCount * 20 + 16;

  let wonAudio = new Audio("./sounds/won.mp3");
  let lostAudio = new Audio("./sounds/lost.mp3");

  function flashRed(button: HTMLButtonElement) {
    button.classList.add("red");
    window.setTimeout(function () {
      button.classList.remove("red");
    }, 200);
  }

  function noClick() {
    setNoCount(noCount + 1);
    setNoPressed(true);
    setYesPressed(false);
  }

  function noButtonPhrase() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function handleAnswer(option: string, button: HTMLButtonElement) {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setLastAnswerCorrect(true);
      wonAudio.play();
      //confetti();
    } else {
      flashRed(button);
      setLastAnswerCorrect(false);
      lostAudio.play();
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  }

  const getImageSrc = () => {
    if (yesPressed) {
      if (quizCompleted) {
        return "https://media1.tenor.com/m/WAFKGS3_xP4AAAAC/love-you-cat.gif";
      } else if (!lastAnswerCorrect) {
        return "https://media1.tenor.com/m/j5rPRPBwSOMAAAAd/cat-smacking-other-cat-cat.gif";
      } else {
        return "https://media1.tenor.com/m/NjL5-IgAVCUAAAAC/chiikawa.gif";
      }
    } else if (noPressed) {
      return "https://media1.tenor.com/m/dWTaM2MSZx4AAAAd/cat-cats.gif";
    } else {
      return "https://media1.tenor.com/m/47qpxBq_Tw0AAAAd/cat-cat-meme.gif";
    }
  };

  return (
    <div className="vcontainer">
      <img alt="conditional" src={getImageSrc()} className="cute-image" />
      <div className="text">
        {yesPressed ? (
          quizCompleted ? (
            <>
              <p>The quiz is now complete</p>
              <p>
                Your score is {score}/{questions.length}
              </p>
              
            </>
          ) : (
            <p>
              Question {currentQuestion + 1}:{" "}
              {questions[currentQuestion].question}
            </p>
          )
        ) : noPressed ? (
          <p>😡What do you mean you're not ready😡</p>
        ) : (
          <p>Are you ready for this generic quiz</p>
        )}
      </div>
      {yesPressed && !quizCompleted ? (
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => handleAnswer(option, e.currentTarget)}
              className="quizButton"
            >
              {option}
            </button>
          ))}
        </div>
      ) : !yesPressed ? (
        <div className="button-container">
          <button
            className="yesButton"
            style={{ fontSize: yesButtonSize }}
            onClick={() => {
              setYesPressed(true);
              setNoPressed(false);
            }}
          >
            Yes
          </button>
          <button onClick={noClick} className="noButton">
            {noButtonPhrase()}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
