import { useState } from "react";
import "./App.css";
//import confetti from "https://cdn.skypack.dev/canvas-confetti";

const phrases = ["No", "Seriously BB?", "Stop joking BB", "笨蛋"];
const questions = [
  {
    question: "Where did we meet?",
    options: ["Drumsheds", "Colour Factory", "Fabric", "Sand Land"],
    answer: "Fabric",
  },
  {
    question: "When is our anniversary",
    options: ["21/01", "22/01", "10/08", "09/09"],
    answer: "21/01",
  },
  {
    question: "Do I love you?",
    options: ["Yes", "No", "Red", "Yellow"],
    answer: "Yes",
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
              <p>生日快乐, 生日快乐 BB!</p>
              <p>
                Your score is {score}/{questions.length}
              </p>
              <p>肖如兰好,</p>
              <p>
                I can’t believe it’s been almost two years together! Time flies
                when you’re with someone as amazing as you. I just wanted to
                take a moment to let you know how much you mean to me,
                especially today, on your birthday and Valentine’s Day.
              </p>
              <p>
                The past year and three-quarters have been a rollercoaster, but
                having you by my side has made everything better. Whether it's
                you helping me prep food on those crazy early shift mornings or
                us brainstorming about the future, you’ve made every moment
                special. I miss you so much when we're apart. It’s in those
                moments that I realize how much you’ve become a part of my life.
                Your little acts of kindness, your laugh, and even the way you
                just get me without me having to say a word - brain connect!
              </p>
              <p>
                Planning our future together has been such a joy. Your
                enthusiasm and love make me so excited for what's to come. I
                can't wait for all the adventures we'll have, big and small.
                Thank you for everything you do, for being my rock, my partner
                in crime, and the love of my life. Here’s to us, to you, and to
                all the incredible moments ahead.
              </p>
              <p>Happy Birthday and Happy Valentine’s Day, bb.</p>
              <p>Love you always,</p>
              <p>Eren</p>
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
          <p>❤️Are you ready for the Valentines Quiz❤️</p>
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
