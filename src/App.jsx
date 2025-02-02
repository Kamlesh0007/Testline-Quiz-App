import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizApp from "./components/QuizApp";
import Result from "./components/Result";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizApp />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default App;
