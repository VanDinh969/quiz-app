import ActionsButton from "../../components/ActionsButton";
import QuestionsContext from "../../context/questions.context";
import styled from "../../styles/EndGame.module.css";
import { useContext } from "react";

export default function EndGamePage() {
  const { goReview, point, handleTryAgain } = useContext(QuestionsContext);
  return (
    <div className={`${styled.endGameContainer} text-center`}>
      <h3 className={`text-white`}>Your core is: {point}</h3>
      <div>
        <ActionsButton
          title={"Try again"}
          actions={handleTryAgain}
          className={`${styled.tryAgainBtn}`}
        />
        <ActionsButton
          title={"Review"}
          actions={goReview}
          className={`${styled.reviewBtn}`}
        />
      </div>
    </div>
  );
}
