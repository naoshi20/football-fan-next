import React, { useState } from 'react'
import Cards from '../cards/cards.component'

const buttonStyle =
  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-black-400 focus:outline-none focus:ring-2'
const selectedButtonStyle = 'bg-white shadow'
const unselectedButtonStyle =
  'text-blue-100 hover:bg-white/[0.12] hover:text-white'
const tabContentStyle =
  'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'

export default function MyTabs({ allPlayers }) {
  const [displayFavorite, setDisplayFavorite] = useState(true)

  function toggleTab(favorite) {
    setDisplayFavorite(favorite)
  }

  return (
    <div>
      <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <button
          className={
            displayFavorite
              ? buttonStyle + ' ' + selectedButtonStyle
              : buttonStyle + ' ' + unselectedButtonStyle
          }
          onClick={() => toggleTab(true)}
        >
          お気に入り
        </button>
        <button
          className={
            !displayFavorite
              ? buttonStyle + ' ' + selectedButtonStyle
              : buttonStyle + ' ' + unselectedButtonStyle
          }
          onClick={() => toggleTab(false)}
        >
          全選手
        </button>
      </div>
      <div>
        <div className={tabContentStyle}>
          <div className="wrapper">
            <div className="row">
              <Cards
                allPlayers={allPlayers}
                displayFavorite={displayFavorite}
              ></Cards>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
