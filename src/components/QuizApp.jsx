import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const QuizApp = () => {
  const navigate = useNavigate();

  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    saveAnswer,
    userAnswers,
    completeQuiz,  quizTimer,
    setQuizTimer,
  } = useContext(QuizContext);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [timerRunning, setTimerRunning] = useState(true); // Timer will start as soon as the quiz starts

  const question = questions[currentQuestionIndex];
  const options = question?.options || [];

  // Timer for the entire quiz (15 minutes)
  useEffect(() => {
    if (!timerRunning) return;

    const quizTimerInterval = setInterval(() => {
      setQuizTimer((prevQuizTimer) => {
        if (prevQuizTimer <= 0) {
          clearInterval(quizTimerInterval);
          handleFinishQuiz();
        }
        return prevQuizTimer - 1;
      });
    }, 1000);

    return () => clearInterval(quizTimerInterval); // Clean up interval on unmount
  }, [timerRunning]);

  // Update the selected answer when navigating between questions
  useEffect(() => {
    const existingAnswer = userAnswers.find(
      (answer) => answer.questionId === question.id
    );
    if (existingAnswer) {
      setSelectedAnswer(existingAnswer.selectedOption);
    } else {
      setSelectedAnswer(null); // Reset selection if no answer exists
    }
  }, [currentQuestionIndex, userAnswers]);

  // Handle Answer Selection
  const handleAnswerClick = (option) => {
    if (loading) return; // Prevent multiple clicks while loading

    setLoading(true);
    setSelectedAnswer(option); // Highlight the selected answer

    // Save the answer
    saveAnswer(question.id, option);

    // Navigate to next question after a delay
    setTimeout(() => {
      setLoading(false);
      handleNextQuestion();
    }, 1000); // Delay before enabling Next button
  };

  const handleFinishQuiz = () => {
    completeQuiz();
    navigate("/result");
  };

 

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  // Calculate progress percentage based on current question index
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!question) return <Loader/>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center  bg-fixed">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-4xl text-center border border-white/60 aspect-w-16 aspect-h-9">
        {/* Quiz Timer */}
        <div className="text-xl font-semibold text-teal-200 mb-4">
          Total Time Remaining: {Math.floor(quizTimer / 60)}:{quizTimer % 60 < 10 ? `0${quizTimer % 60}` : quizTimer % 60}
        </div>

        {/* Progress Bar with Percentage */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
            style={{
              width: `${progressPercentage}%`, // Dynamically set the progress width
            }}
          ></div>
        </div>

        {/* Display Progress Percentage */}
        <div className="text-xl font-semibold text-white mb-4">
          {Math.round(progressPercentage)}% Completed
        </div>

        {/* Question Title */}
        <h2 className="text-3xl font-bold text-yellow-200 mb-3">
          {question.topic}
        </h2>

        <h2 className="text-xl font-semibold text-white">
          {currentQuestionIndex + 1}. {question.description}
        </h2>

        {/* Options Buttons */}
        <div className="mt-6 space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`block w-full py-3 px-5 rounded-lg transition-all 
                bg-white text-gray-700
                hover:bg-purple-500 hover:text-white
                hover:scale-105 hover:shadow-lg
                ${selectedAnswer === option ? (option.is_correct ? "bg-green-600" : "bg-red-600") : ""}`}
            >
              {option.description}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`py-3 px-6 rounded-lg bg-teal-500 text-white font-semibold 
            ${currentQuestionIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || loading}
            className={`py-3 px-6 rounded-lg bg-teal-500 text-white font-semibold 
            ${selectedAnswer === null || loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
