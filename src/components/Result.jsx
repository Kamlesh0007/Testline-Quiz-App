import { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Add this for a home icon

const Result = () => {
  const navigate = useNavigate();
  const { questions, userAnswers,quizCompleted,resetQuiz } = useContext(QuizContext);

  console.log(questions);
  
   // Redirect if quiz is not completed
   useEffect(() => {
    if (!quizCompleted) {
      navigate("/"); // Navigate to the quiz page if the quiz is not completed
    }
  }, [quizCompleted, navigate]);

  // Calculate correct and incorrect answers
  const correctAnswersCount = userAnswers.filter(
    (ans) => ans.selectedOption?.is_correct
  ).length;

  const incorrectAnswersCount = userAnswers.filter(
    (ans) => !ans.selectedOption?.is_correct
  ).length;

  const handleGoToHome = () => {
    resetQuiz(); // Reset timer, questions, and answers
    navigate("/");
  };
  // Total score calculation: 4 points for correct, -1 for incorrect
  const totalScore = (correctAnswersCount * 4) - (incorrectAnswersCount * 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-4xl text-center border border-white/60 aspect-w-16 aspect-h-9">
        <h2 className="text-3xl font-bold text-green-500"> 🎉 Quiz Completed! 🎉</h2>
        <button
    onClick={handleGoToHome}
          className="mt-6 bg-red-400 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          <FaHome className="inline-block mr-2" /> Go to Home
        </button>
        <p className="mt-4 text-lg font-semibold">
          Your Score: <span className="text-teal-500">{totalScore} / {questions.length * 4}</span>
        </p>

        <div className="mt-4 flex justify-center gap-8 text-lg font-medium">
            <div className=" text-white px-4 py-2 rounded-lg">
              ✅ Correct: {correctAnswersCount}
            </div>
            <div className=" text-white px-4 py-2 rounded-lg">
              ❌ Incorrect: {incorrectAnswersCount}
            </div>
          </div>

        <div className="mt-6 w-full text-left">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index]?.selectedOption;
            const correctAnswer = question.options.find(
              (opt) => opt.is_correct
            );

            return (
              <div
                key={index}
                className="mb-6 p-6  rounded-lg shadow-md border border-gray-300"
              >
                <p className="font-semibold text-lg text-white">
                  {index + 1}. {question.description}
                </p>

                <p
                  className={`mt-3 p-3 rounded-md font-medium ${
                    userAnswer?.is_correct
                      ? "bg-green-100 text-green-700 border border-green-500"
                      : "bg-red-100 text-red-700 border border-red-500"
                  }`}
                >
                  ✅ Your Answer: {userAnswer?.description || "Not answered"}
                </p>

                <p className="mt-3 p-3 bg-blue-100 text-blue-800 border border-cyan-500 rounded-md font-medium">
                  🎯 Correct Answer: {correctAnswer?.description}
                </p>

                <div className="mt-4 p-4 bg-white border-l-4 border-cyan-500  shadow-sm rounded-md">
                  <h3 className="text-md font-semibold text-gray-700">
                    📘 Explanation:
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">
                    {question?.detailed_solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
