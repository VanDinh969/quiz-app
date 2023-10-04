import { useContext } from "react";
import QuestionsContext from "../../questions.context";
import ActionsButton from "../../components/ActionsButton";
import styled from "../../styles/Review.module.css";

export default function ReviewPage() {
  const {
    questionList,
    currentQuestion,
    questionQuantity,
    handleNext,
    handlePrevious,
    handleTryAgain,
  } = useContext(QuestionsContext);
  const curQuestion = questionList[currentQuestion];

  return (
    <div
      className={`d-flex flex-column justify-content-between align-items-center ${styled.reviewContainer}`}
    >
      {/* button */}
      <div>
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
          title={"Restart"}
          actions={handleTryAgain}
          className={`${styled.buttonRestart}`}
        />
      </div>

      {/* Question */}
      <div
        className={`position-relative text-center bg-white px-3 rounded-lg ${styled.questionContainer} ${styled.boxShadow}`}
        style={{ width: "45rem", height: "14rem" }}
      >
        {/* timing o'clock */}
        <div
          className={`${styled.timingContainer} ${styled.boxShadow} position-absolute rounded-circle d-flex justify-content-center align-items-center bg-white`}
        >
          <p className={`mb-0`}>End!</p>
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
            className={`${styled.boxShadow} ${
              styled.answerBox
            } px-3 rounded-lg my-3 d-flex align-items-center ${
              item.correct ? styled.correctAnswer : ""
            } ${
              item.selected === true && item.correct === false
                ? styled.falseAnswer
                : ""
            }`}
            style={{ width: "40rem", height: "4rem" }}
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
