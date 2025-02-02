import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext"; 
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Home = () => {
  const { quizData } = useContext(QuizContext);
  const navigate = useNavigate();

  // If quizData is not yet loaded, show a loading state
  if (!quizData) {
    return <Loader/>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center">

      {/* Main Content Section */}
      <div className="bg-white/20 backdrop-blur-xl p-12 rounded-2xl shadow-2xl max-w-4xl w-full 
          border border-white/60">

        <h1 className="text-5xl font-extrabold text-yellow-200 drop-shadow-lg">
          🚀 TestLine Quiz App
        </h1>

        <p className="mt-6 text-lg text-cyan-200 font-medium drop-shadow-md">
          Welcome to <span className="font-semibold">TestLine Quiz App</span>! 
          Challenge yourself with fun and engaging questions. 
          Compete, learn, and have fun!
        </p>

        {/* Quiz Information */}
        <div className="mt-8 p-6 bg-white/20  rounded-lg shadow-md border border-white/40">
  <h2 className="text-3xl font-semibold text-teal-400 drop-shadow-md">Quiz Information:</h2>
  
  <ul className="list-none text-left text-teal-200 mt-3 ml-6 space-y-4 drop-shadow-sm">
    <li className="flex items-center">
      <span className="text-pink-800 text-xl mr-3">📚</span>
      <strong className="text-pink-800 text-lg mr-1 ">Topic : </strong> { quizData.topic}
    </li>
    <li className="flex items-center">
      <span className="text-indigo-800 text-xl mr-3">⏳</span>
      <strong className="text-indigo-800 text-lg mr-1 ">Duration : </strong> {quizData.duration} minutes
    </li>
    <li className="flex items-center">
      <span className="text-yellow-400 text-xl mr-3">❓</span>
      <strong className="text-yellow-400 text-lg mr-1 ">Total Questions :</strong> {quizData.questions_count}
    </li>
    <li className="flex items-center">
      <span className="text-green-800 text-xl mr-3">✅</span>
      <strong className="text-green-800 text-lg mr-1 ">Marks for Correct Answer:  </strong> +{quizData.correct_answer_marks}
    </li>
    <li className="flex items-center">
      <span className="text-red-800 text-xl mr-3">⚠️</span>
      <strong className="text-red-800 text-lg mr-1 ">Negative Marking :  </strong> -{quizData.negative_marks}
    </li>
  </ul>
</div>


        <button
          onClick={() => navigate("/quiz")}
          className="mt-8 px-8 py-4 text-xl font-semibold bg-purple-600 text-white rounded-lg shadow-lg 
            hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
        >
          Play Quiz 🎉
        </button>
      </div>
    </div>
  );
};

export default Home;
