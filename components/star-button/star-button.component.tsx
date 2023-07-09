import card from '../card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton() {
  return (
    <div className={card.starButton}>
      <button>
        <i className={`fa-solid fa-star ${starButton.faStar}`}></i>
      </button>
    </div>
  )
}
