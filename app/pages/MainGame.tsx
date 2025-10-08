import { useState } from 'react'
import { useNavigate } from 'react-router'
import cowWhiteSrc from '@/assets/cow-white.png'
import fieldSrc from '@/assets/field.png'
import backgroundSkySrc from '@/assets/background-sky.png'
import '@/pages/MainGame.css'
import { MainRow } from '@/components/MainRow'

export const MainGame = () => {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <MainRow backgroundImageSrc={backgroundSkySrc}>
      <button
        type="button"
        aria-label="Back to start"
        className="back-button unstyled-button"
        onClick={() => navigate('/')}
      >
        &lt;
      </button>
      <div className="count-display" role="status" aria-live="polite" aria-atomic="true">{count}</div>
      <div className="cow-row">
        <img src={fieldSrc} className="field" alt="the field that the cow stands on" aria-hidden="true" />
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
