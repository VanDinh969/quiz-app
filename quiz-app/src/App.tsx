import { useEffect, useState } from "react";
import StartGamePage from "./pages/StartGame";
import InGamePage from "./pages/Ingame";
import EndGamePage from "./pages/EndGame";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppServices from "./services/AppServices";
import QuestionsContext from "./questions.context";
import styled from "./styles/App.module.css";
import { IAnswer, IQuestion } from "./types";
import ReviewPage from "./pages/ReView";

function App() {
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);

  const questionQuantity: number = questionList.length;
  const workTime: number = 10;
  const [isInGame, setIsInGame] = useState<boolean>(false);

  const navigate = useNavigate();

  // handle next quiz
  const handleNext = () => {
    if (currentQuestion === questionList.length - 1) {
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  // handle previus quiz
  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }
    setCurrentQuestion((prev) => prev - 1);
  };

  // handle select answer
  const handleSelectAnswer = (answerValue: number) => {
    const newQuestionList: IQuestion[] = questionList.map((question, index) => {
      if (index === currentQuestion) {
        const res: IAnswer[] = question.answers.map((ansList, i) => {
          return { ...ansList, selected: answerValue === i ? true : false };
        });
        return { ...question, answers: res };
      } else {
        return { ...question };
      }
    });
    setQuestionList(newQuestionList);
  };

  // handle scoring
  const handleScoring = () => {
    let newPoint: number = 0;
    questionList.forEach((question) => {
      question.answers.forEach((ans) => {
        if (ans.correct === true && ans.selected === true) {
          newPoint++;
        }
      });
    });
    return newPoint;
  };

  // Submit
  const handleSubmit = () => {
    setTimeState(0);
    const newPoint = handleScoring();
    const confirm = window.confirm("Do you want to submit answes ?");
    if (confirm === true) {
      setPoint(newPoint);
      navigate(`/end-game`);
    }
  };

  // timing clock
  const [timeState, setTimeState] = useState<number>(workTime);

  const goInGame = () => {
    setIsInGame(true);
    navigate(`/in-game`);
  };

  useEffect(() => {
    let setIntervalTiming: number;
    if (isInGame && timeState) {
      setIntervalTiming = setInterval(() => {
        console.log("time state:", timeState);
        setTimeState((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(setIntervalTiming);
  }, [timeState, isInGame]);

  useEffect(() => {
    if (timeState === 0) {
      const newPoint = handleScoring();
      setPoint(newPoint);
      navigate(`/end-game`);
    }
  }, [timeState]);

  // go review
  const goReview = () => {
    setCurrentQuestion(0);
    navigate(`/review`);
  };

  // Try again
  const handleTryAgain = () => {
    window.location.href = "/";
  };

  // Context
  const questionsCtxValue = {
    questionList,
    currentQuestion,
    point,
    questionQuantity,
    goInGame,
    handleNext,
    handlePrevious,
    handleSelectAnswer,
    handleSubmit,
    goReview,
    handleTryAgain,
    timeState,
  };

  useEffect(() => {
    AppServices.getQuestions().then((response) => {
      setQuestionList(response);
    });
  }, []);

  return (
    <>
      <QuestionsContext.Provider value={questionsCtxValue}>
        <div className={`${styled.bgDefault}`}>
          <Routes>
            <Route path="*" element={<h3>Not found</h3>} />
            <Route path="" element={<Navigate to="start-game" />} />
            <Route path="start-game" element={<StartGamePage />} />
            <Route path="in-game" element={<InGamePage />} />
            <Route path="end-game" element={<EndGamePage />} />
            <Route path="review" element={<ReviewPage />} />
          </Routes>
        </div>
      </QuestionsContext.Provider>
    </>
  );
}

export default App;
