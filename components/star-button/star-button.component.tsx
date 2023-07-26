import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import card from '../card/card.module.scss'
import starButton from './star-button.module.scss'

export default function StarButton({ playerId, favorite, clickCallBack }) {
  const handleClick = (playerId: number) => {
    clickCallBack(playerId)
  }
  return (
    <div className={`${starButton.checkboxContainer} ${card.starButton} p-2`}>
      <label>
        <input
          type="checkbox"
          className={`${starButton.checkboxInput}`}
          checked={favorite}
          onChange={() => handleClick(playerId)}
        />
        <div>
          <FontAwesomeIcon
            icon={favorite ? faStarSolid : faStarRegular}
            className={`${starButton.checkboxIcon} ${
              favorite ? `${starButton.checked}` : ''
            }`}
            data-testid={favorite ? 'star-solid-icon' : 'star-regular-icon'}
          />
        </div>
      </label>
    </div>
  )
}
