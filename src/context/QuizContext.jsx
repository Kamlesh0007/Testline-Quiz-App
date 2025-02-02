import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); // Track answers per question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion

  const completeQuiz = () => {
    setQuizCompleted(true); 
  };
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_SERVER_DOMAIN;
   // const apiUrl = 'http://localhost:3000/api/server'
    axios
      .get(apiUrl)
      .then((response) => {
        setQuizData(response.data);
        setQuestions(response.data.questions);
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  // Save or update the answer for a specific question
  const saveAnswer = (questionId, selectedOption) => {
    setUserAnswers((prev) => {
      const updatedAnswers = prev.filter((answer) => answer.questionId !== questionId); // Remove any previous answer for the current question
      return [...updatedAnswers, { questionId, selectedOption }];
    });
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        quizData,
        userAnswers,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        saveAnswer,
        quizCompleted, completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
