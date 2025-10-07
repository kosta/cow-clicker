import { useNavigate } from "react-router";
import startScreenSrc from "./assets/start-screen.png";
import "./StartScreen.css";
import { MainRow } from "@/MainRow";

export default function StartScreen() {
  const navigate = useNavigate();

  return <MainRow backgroundImageSrc={startScreenSrc}>
    <button className="start-button" onClick={() => navigate("/cow")}>Start Game</button>
  </MainRow>
}
