import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton({ playerId, favorite, clickCallBack }) {
  const handleClick = (playerId: number) => {
    clickCallBack(playerId)
  }
  return (
    <div className={`${card.starButton} p-2`}>
      <button
        onClick={e => {
          e.preventDefault() // prevent page transition by link component
          handleClick(playerId)
        }}
      >
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
