import { useState } from 'react'
import gato from './assets/Gato1.png'
import flores from './assets/Flores.png'

const MESSAGES = [
  'No',
  'Di que si y te llevo a comer',
  'Di que si y te doy flores uwu',
  'Y chocolates eh',
  'Por favor :c',
]

export default function App() {
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

  return (
    <div className='container'>
      <h1 className='title'>
        {!isForgiven
          ? '¿Quieres ser mi San Valentín? 💖'
          : 'Espera las de verdad en la tarde, TE AMOOOO 💞💓💗💖'}
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
        <div className={`${isForgiven ? 'hidden-buttons' : 'container-btns'}`}>
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
            Si
          </button>
          <button
            className='btn btn-no'
            onClick={handleClickIncreaseButtonSize}
          >
            {MESSAGES[clicks]}
          </button>
        </div>
      </section>
    </div>
  )
}
