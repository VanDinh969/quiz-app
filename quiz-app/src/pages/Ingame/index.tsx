import { useContext, useEffect, useState } from "react";
import styled from "../../styles/InGame.module.css";
import QuestionsContext from "../../context/questions.context";
import ActionsButton from "../../components/ActionsButton";
import { CircularProgress } from "@mui/material";

export default function InGamePage() {
  const {
    questionList,
    currentQuestion,
    handleNext,
    handlePrevious,
    questionQuantity,
    handleSelectAnswer,
    handleSubmit,
    timeState,
  } = useContext(QuestionsContext);

  const curQuestion = questionList[currentQuestion];
  const [time] = useState<number>(timeState);

  return (
    <div
      className={`d-flex flex-column justify-content-between align-items-center ${styled.inGameContainer}`}
    >
      {/* button */}
      <div className={`d-flex-justify-content-center`}>
        <ActionsButton
          title={"Previous"}
          actions={handlePrevious}
          className={`${
            curQuestion.id === "1" ? styled.buttonPreOff : styled.buttonPreOn
          }`}
        />
        <ActionsButton
          title={"Next"}
          actions={handleNext}
          className={`${
            Number(curQuestion.id) === questionQuantity
              ? styled.buttonNextOff
              : styled.buttonNextOn
          }`}
        />
        <ActionsButton
          title={"Submit"}
          actions={handleSubmit}
          className={`${styled.buttonSubmit}`}
          style={{
            display:
              Number(curQuestion.id) === questionQuantity
                ? "inline-block"
                : "none",
          }}
        />
      </div>

      {/* Question */}
      <div
        className={`position-relative text-center bg-white px-3 rounded-lg ${styled.questionContainer} ${styled.boxShadow}`}
        style={{ width: "45rem", height: "14rem" }}
      >
        {/* timing o'clock */}
        <div
          className={`${styled.timingContainer} position-absolute rounded-circle d-flex justify-content-center align-items-center bg-white`}
        >
          <CircularProgress
            variant="determinate"
            value={(timeState / time) * 100}
            // value={75}
            size={80}
          />
        </div>
        <div
          className={`${styled.timingContainer} ${styled.boxShadow} position-absolute rounded-circle d-flex justify-content-center align-items-center`}
        >
          <p className={`${timeState < 10 ? "text-danger" : ""} mb-0`}>
            {String(Math.floor(timeState / 60)).padStart(2, "0")}:
            {String(timeState % 60).padStart(2, "0")}
          </p>
        </div>
        {/* Question content*/}
        <div className={`${styled.questionNumber}`}>
          <p>
            Question {curQuestion.id}/{questionQuantity}
          </p>
        </div>
        <div className={`${styled.questionContent}`}>
          <p>{curQuestion.question_content}</p>
        </div>
      </div>

      {/* Answer */}
      <div>
        {curQuestion.answers.map((item, index) => (
          <div
            key={index}
            className={`${styled.boxShadow} ${styled.answerBox} ${
              item.selected ? styled.answerSelected : ""
            } px-3 rounded-lg my-3 d-flex align-items-center`}
            style={{ width: "40rem", height: "4rem" }}
            onClick={() => handleSelectAnswer(index)}
          >
            <p className={`${styled.answerContent} mb-0`}>
              {index + 1}. {item.answer_content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
