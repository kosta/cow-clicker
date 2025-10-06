import { useState } from 'react'
import cowWhiteSrc from './assets/cow-white.png'
import fieldSrc from './assets/field.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={cowWhiteSrc} className="logo" alt="Vite logo" />
      <img src={fieldSrc} className="logo" alt="Vite logo" />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
