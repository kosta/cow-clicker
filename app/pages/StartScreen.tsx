import { useNavigate } from "react-router";
import startScreenSrc from "@/assets/start-screen.png";
import "@/pages/StartScreen.css";
import { MainRow } from "@/components/MainRow";
import startButtonSrc from "@/assets/start-button.png";

export default function StartScreen() {
  const navigate = useNavigate();

  return <MainRow backgroundImageSrc={startScreenSrc}>
    <button className="start-button hover-highlight unstyled-button" onClick={() => navigate("/cow")} aria-label="Start game">
      <img src={startButtonSrc} alt="Start game" aria-hidden="true" />
    </button>
  </MainRow>
}
