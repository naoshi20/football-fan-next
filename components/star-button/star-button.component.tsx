import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton({ playerId, favorite, clickCallBack }) {
  const handleClick = (playerId: number) => {
    clickCallBack(playerId)
  }
  return (
    <div className={`${card.starButton} p-2`}>
      {/* aria-pressed="false"使ってみたい */}
      <button
        onClick={e => {
          handleClick(playerId)
          e.preventDefault() // prevent page transition by link component
        }}
        className={`fa-star
      ${
        favorite
          ? `fa-solid ${starButton.orange}`
          : `fa-regular ${starButton.grey}`
      }
      `}
      ></button>
    </div>
  )
}
