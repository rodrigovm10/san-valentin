import { useState, useEffect } from 'react'
import gato from './assets/Gato1.png'
import flores from './assets/Flores.png'

const MESSAGES = [
  'No',
  'Di que si y te llevo a comer 🍔',
  'Acepta y te daré un regalo muy especial 🎁',
  'Acepta y te doy flores 💐',
  'Y chocolates eh 🍫',
  'Y un besito 💋',
  'Y un abrazo 🤗',
  'Por favor :c',
]

const HEART_EMOJIS = ['💖', '💗', '💓', '💞', '💕', '💘', '💝', '❤️', '🩷', '🌹']

function Loader({ onFinish }: { onFinish: () => void }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000)
    const hideTimer = setTimeout(() => onFinish(), 3800)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onFinish])

  return (
    <div className={`loader-overlay ${fadeOut ? 'loader-fade-out' : ''}`}>
      <div className='loader-hearts'>
        <span className='loader-heart heart-1'>💖</span>
        <span className='loader-heart heart-2'>💗</span>
        <span className='loader-heart heart-3'>💓</span>
        <span className='loader-heart heart-4'>💞</span>
        <span className='loader-heart heart-5'>💕</span>
      </div>
      <div className='loader-big-heart'>💝</div>
      <p className='loader-text'>Preparando algo especial para ti...</p>
      <div className='loader-dots'>
        <span className='dot dot-1'></span>
        <span className='dot dot-2'></span>
        <span className='dot dot-3'></span>
      </div>
    </div>
  )
}

function FallingHearts() {
  return (
    <div className='celebration-hearts'>
      {HEART_EMOJIS.map((heart, i) => (
        <span
          key={i}
          className='falling-heart'
        >
          {heart}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isForgiven, setIsForgiven] = useState(false)
  const [buttonSize, setButtonSize] = useState(20)
  const [clicks, setClicks] = useState(0)

  const handleClickForgive = () => {
    setIsForgiven(true)
    setButtonSize(20)
    setClicks(0)
  }

  const handleClickIncreaseButtonSize = () => {
    if (isForgiven) return

    setButtonSize(prevState => prevState + 10)
    if (clicks === MESSAGES.length - 1) {
      setClicks(MESSAGES.length - 1)
      return
    }
    setClicks(prevState => prevState + 1)
  }

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />
  }

  return (
    <div className={`container app-fade-in ${isForgiven ? 'is-forgiven' : ''}`}>
      {isForgiven && <FallingHearts />}

      <h1 className={isForgiven ? 'title-forgiven' : 'title'}>
        {!isForgiven
          ? '¿Quieres ser mi San Valentín? 💖'
          : 'Gracias por aceptar, te daré lo prometido, TE AMOOOO 💞💓💗💖'}
      </h1>

      <section className='section-img'>
        {isForgiven ? (
          <img
            src={flores}
            alt='Monito con flores en la mano'
          />
        ) : (
          <img
            src={gato}
            alt='Gato tímido'
          />
        )}
      </section>

      <section className='section-forgive'>
        <div className={isForgiven ? 'hidden-buttons' : 'container-btns'}>
          <button
            style={{
              paddingTop: `${buttonSize + 5.5}px`,
              paddingBottom: `${buttonSize + 5.5}px`,
              paddingRight: `${buttonSize + 5.5}px`,
              paddingLeft: `${buttonSize + 5.5}px`,
            }}
            className='btn btn-yes'
            onClick={handleClickForgive}
          >
            <span className='btn-heart btn-heart-left'>💕</span>
            <span className='btn-label'>Si</span>
            <span className='btn-heart btn-heart-right'>💕</span>
          </button>
          <button
            className='btn btn-no'
            onClick={handleClickIncreaseButtonSize}
          >
            <span className='btn-icon'>💔</span>
            <span className='btn-label'>{MESSAGES[clicks]}</span>
          </button>
        </div>
      </section>
    </div>
  )
}
