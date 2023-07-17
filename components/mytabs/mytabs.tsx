import React, { useState } from 'react'
import Cards from '../cards/cards.component'
import Image from 'next/image'
import { ABBREVIATED_TEAM_NAME } from '../../model/team.model'

const buttonStyle =
  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-black-400 focus:outline-none focus:ring-2'
const selectedButtonStyle = 'bg-white shadow'
const unselectedButtonStyle =
  'text-blue-100 hover:bg-white/[0.12] hover:text-white'
const tabContentStyle =
  'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'

export default function MyTabs({ allPlayers }) {
  const [displayFavorite, setDisplayFavorite] = useState(true)
  const initialValue = convertArrayToObject(
    Object.values(ABBREVIATED_TEAM_NAME)
  )
  const [displayTeamObj, setDisplayTeamObj] = useState(initialValue)

  function toggleTab(favorite) {
    setDisplayFavorite(favorite)
  }

  function toggleDisplayTeamObj(teamName) {
    const nextDisplayTeamObj = { ...displayTeamObj }
    nextDisplayTeamObj[teamName] = !displayTeamObj[teamName]
    setDisplayTeamObj(nextDisplayTeamObj)
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
      <div className="grid grid-cols-10 mt-4">
        {Object.values(ABBREVIATED_TEAM_NAME).map(teamName => (
          <button
            onClick={() => toggleDisplayTeamObj(teamName)}
            className="flex justify-center"
          >
            <Image
              src={
                displayTeamObj[teamName]
                  ? `/images/teams/${teamName}.png`
                  : `/images/teams/${teamName}_gray_alpha.png`
              }
              width={48}
              height={48}
              alt="Picture of the player"
              quality={100}
              priority={false}
            />
          </button>
        ))}
      </div>
      <div>
        <div className={tabContentStyle}>
          <div className="wrapper">
            <div className="row">
              <Cards
                allPlayers={allPlayers}
                displayFavorite={displayFavorite}
                displayTeamObj={displayTeamObj}
              ></Cards>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function convertArrayToObject(array) {
  const obj = {}
  array.forEach(v => {
    obj[v] = true
  })
  return obj
}
