import { useNavigate } from "react-router-dom";
import styled from "../../styles/StartGame.module.css";

export default function StartGamePage() {
  const navigate = useNavigate();

  return (
    <div className={`text-center ${styled.pt64}`}>
      <h1 className={`${styled.fontBold} mb-4 text-white`}>
        Welcome to React Quiz Game!
      </h1>
      <button
        className={`${styled.button} ${styled.fontBold}`}
        onClick={() => navigate(`/in-game`)}
      >
        Start
      </button>
    </div>
  );
}
