import { useState } from 'react'
import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton() {
  const [isFavorite, setIsFavorite] = useState(false)

  function toggleFavoriteStatus() {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={card.starButton}>
      <button onClick={() => toggleFavoriteStatus()}>
        <i
          className={`fa-star ${
            isFavorite
              ? `fa-solid ${starButton.orange}`
              : `fa-regular ${starButton.grey}`
          }`}
        ></i>
      </button>
    </div>
  )
}
