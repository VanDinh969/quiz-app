import React from "react";
import { IQuestion } from "../types";

const QuestionsContext = React.createContext({
  questionList: [] as IQuestion[],
  currentQuestion: 0,
  point: 0,
  questionQuantity: 0,
  goInGame: () => {},
  handleNext: () => {},
  handlePrevious: () => {},
  handleSelectAnswer: (answerValue: number) => {
    console.log(answerValue);
  },
  handleSubmit: () => {},
  goReview: () => {},
  handleTryAgain: () => {},
  timeState: 0,
});

export default QuestionsContext;
