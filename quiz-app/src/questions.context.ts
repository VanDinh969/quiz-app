import React from "react";
import { IQuestion } from "./types";

const QuestionsContext = React.createContext({
  questionList: [] as IQuestion[],
  currentQuestion: 0,
  point: 0,
  questionQuantity: 0,
  handleNext: () => {},
  handlePrevious: () => {},
  handleSelectAnswer: (answerValue: number) => {},
  handleSubmit: () => {},
  timing: 0,
});

export default QuestionsContext;
