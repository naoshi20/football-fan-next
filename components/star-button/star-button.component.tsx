import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton({ playerId, favorite, clickCallBack }) {
  return (
    <div className={card.starButton}>
      <button onClick={() => clickCallBack(playerId)}>
        <i
          className={`fa-star
          ${
            favorite
              ? `fa-solid ${starButton.orange}`
              : `fa-regular ${starButton.grey}`
          }
          `}
        ></i>
      </button>
    </div>
  )
}
