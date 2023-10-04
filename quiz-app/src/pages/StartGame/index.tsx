import styled from "../../styles/StartGame.module.css";
import { useContext } from "react";
import QuestionsContext from "../../context/questions.context";

export default function StartGamePage() {
  // const navigate = useNavigate();
  const { goInGame } = useContext(QuestionsContext);

  return (
    <div className={`text-center ${styled.pt64}`}>
      <h1 className={`${styled.fontBold} mb-4 text-white`}>
        Welcome to React Quiz Game!
      </h1>
      <button
        className={`${styled.button} ${styled.fontBold}`}
        onClick={() => goInGame()}
      >
        Start
      </button>
    </div>
  );
}
