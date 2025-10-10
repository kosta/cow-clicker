import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import cowWhiteSrc from '@/assets/cow-white.png'
import fieldSrc from '@/assets/field.png'
import backgroundSkySrc from '@/assets/background-sky.png'
import '@/pages/MainGame.css'
import { MainRow } from '@/components/MainRow'
import Spinner from '@/components/Spinner'
import { useMutation, useQuery } from '@connectrpc/connect-query'
import { click } from '@gen/cowclicker/v1/click-ClickService_connectquery'

const NEXT_CLICK_DELAY = 1000; // 1 second
const INTERVAL_MS = Math.floor(1000 / 24); // 24 fps

export const MainGame = () => {
  const clickCountIsLoading = useState(true);
  const [count, setCount] = useState(0)
  const [preventClickUntil, setPreventClickUntil] = useState<number | null>(null)
  const navigate = useNavigate()
  const { mutate: clickMutate, isPending: clickIsPending } = useMutation(click, {
    onSuccess: (data) => {
      console.log("got data", data)
      setCount(Number(data.clickCount))
      // TODO: set the preventClickUntil
    },
    onError: (error) => {
      console.error("got error clickingerror", error)
    }
  });
  const allowClick = !preventClickUntil && !clickIsPending;
  const handleClick = () => {
    clickMutate({})
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (preventClickUntil && Date.now() > preventClickUntil) {
        setPreventClickUntil(null)
      }
    }, INTERVAL_MS);
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
          disabled={!allowClick}
          aria-label="Click the cow"
          className={`cow-button ${allowClick ? 'hover-highlight' : ''} unstyled-button`}
        >
          <img src={cowWhiteSrc} className="cow" alt="" aria-hidden="true" />
          {!allowClick && <Spinner className='spinner__cow' />}
        </button>
      </div>
    </MainRow>
  )
}
