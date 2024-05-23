import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Question {
  question: string;
  options: string[];
  correctAns: string;
}

function App(): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizEnded, setQuizEnded] = useState(false);

  const questions: Question[] = [
    {
      question: "Html Stands For____________________________",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },
    {
      question: "Css Stands For _______________________",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "Js Stands For _______________________",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "Dom Stands For _______________________",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "Ram Stands For _______________________",
      options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correctAns: "Random Acccess Memory",
    },
    {
      question: "Rom Stands For _______________________",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ];

  const handleAnswer = (selectedOption: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setSelectedAnswers(updatedAnswers);

    if (selectedOption === questions[currentQuestion].correctAns) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizEnded(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers([]);
    setQuizEnded(false);
  };

  const showCorrectAnswers = () => {
    return questions.map((question, index) => (
      <div key={index} className="question-answer">
        <p className="question">{question.question}</p>
        <p className="correct-answer">Correct Answer: {question.correctAns}</p>
        <p className="user-answer">Your Answer: {selectedAnswers[index]}</p>
      </div>
    ));
  };

  const quizContent = !quizEnded ? (
    <>
      <p className="question-count">Question {currentQuestion + 1} of {questions.length}</p>
      <p className="question">{questions[currentQuestion].question}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} className="option" onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </>
  ) : (
    <>
      <p className="score">Quiz ended! Your score is {score}/{questions.length}</p>
      <div className="answers">{showCorrectAnswers()}</div>
      <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
    </>
  );

  return (
    <div className="App">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz App</h1>
        {quizContent}
      </div>
    </div>
  );
}

export default App;
