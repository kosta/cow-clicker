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
          <img src={cowWhiteSrc} className="cow" alt="cow" />
        </div>
      </div>
    </div>
  )
}
