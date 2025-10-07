import { useNavigate } from "react-router";
import startScreenSrc from "./assets/start-screen.png";
import "./StartScreen.css";

export default function StartScreen() {
  const navigate = useNavigate();

  return <div className="main-game">
    <div className="main-row" style={{ backgroundImage: `url(${startScreenSrc})` }}>
      <button className="start-button" onClick={() => navigate("/cow")}>Start Game</button>
    </div>
  </div>
}
