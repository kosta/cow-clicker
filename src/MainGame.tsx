import { useState } from 'react'
import cowWhiteSrc from './assets/cow-white.png'
import fieldSrc from './assets/field.png'
import './MainGame.css'

export const MainGame = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="main-game">
      <div className="main-row">
        <div className="cow-row">
          <img src={fieldSrc} className="field" alt="field" />
          <button
            type="button"
            onClick={() => setCount((count) => count + 1)}
            aria-label="Click the cow"
            className="cow-button"
          >
            <img src={cowWhiteSrc} className="cow" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
