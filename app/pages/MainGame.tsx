import { useState } from 'react'
import cowWhiteSrc from '@/assets/cow-white.png'
import fieldSrc from '@/assets/field.png'
import backgroundSkySrc from '@/assets/background-sky.png'
import '@/pages/MainGame.css'
import { MainRow } from '@/components/MainRow'

export const MainGame = () => {
  const [count, setCount] = useState(0)

  return (
    <MainRow backgroundImageSrc={backgroundSkySrc}>
      <div className="count-display">{count}</div>
      <div className="cow-row">
        <img src={fieldSrc} className="field" alt="field" />
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          aria-label="Click the cow"
          className="cow-button hover-highlight unstyled-button"
        >
          <img src={cowWhiteSrc} className="cow" alt="" aria-hidden="true" />
        </button>
      </div>
    </MainRow>
  )
}
