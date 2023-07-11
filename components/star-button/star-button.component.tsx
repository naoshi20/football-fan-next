import { useState } from 'react'
import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'
import updatePlayer from '../../lib/update-player'

export default function StarButton({ playerId }) {
  const [isFavorite, setIsFavorite] = useState(false)

  async function toggleFavoriteStatus() {
    setIsFavorite(!isFavorite)
    await updatePlayer(playerId, !isFavorite)
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
