import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import cowWhiteSrc from '@/assets/cow-white.png'
import fieldSrc from '@/assets/field.png'
import backgroundSkySrc from '@/assets/background-sky.png'
import '@/pages/MainGame.css'
import { MainRow } from '@/components/MainRow'

const NEXT_CLICK_DELAY = 1000; // 1 second

export const MainGame = () => {
  const [count, setCount] = useState(0)
  const [preventClickUntil, setPreventClickUntil] = useState<number | null>(null)
  const navigate = useNavigate()
  const handleClick = () => {
    setPreventClickUntil(new Date(Date.now() + NEXT_CLICK_DELAY).getTime())
    setCount((count) => count + 1)
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (preventClickUntil && Date.now() > preventClickUntil) {
        setPreventClickUntil(null)
      }
    }, 50);
    return () => clearInterval(intervalId)
  }, [preventClickUntil])

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
          onClick={handleClick}
          disabled={preventClickUntil !== null}
          aria-label="Click the cow"
          className={`cow-button ${preventClickUntil === null ? 'hover-highlight' : ''} unstyled-button`}
        >
          <img src={cowWhiteSrc} className="cow" alt="" aria-hidden="true" />
        </button>
      </div>
    </MainRow>
  )
}
