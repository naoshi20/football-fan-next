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

function TabButton({ selected, onClick, children }) {
  return (
    <button
      className={`${buttonStyle} ${
        selected ? selectedButtonStyle : unselectedButtonStyle
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function MyTabs({ allPlayers }) {
  const [displayFavorite, setDisplayFavorite] = useState(true)
  const initialValue = Object.fromEntries(
    Object.values(ABBREVIATED_TEAM_NAME).map(name => [name, true])
  )
  const [displayTeamObj, setDisplayTeamObj] = useState(initialValue)

  return (
    <div>
      <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <TabButton
          selected={displayFavorite}
          onClick={() => setDisplayFavorite(true)}
        >
          お気に入り
        </TabButton>
        <TabButton
          selected={!displayFavorite}
          onClick={() => setDisplayFavorite(false)}
        >
          全選手
        </TabButton>
      </div>
      <div className="grid grid-cols-10 mt-4">
        {Object.values(ABBREVIATED_TEAM_NAME).map(teamName => (
          <button
            onClick={() =>
              // おしゃだね
              setDisplayTeamObj(prev => ({
                ...prev,
                [teamName]: !prev[teamName]
              }))
            }
            className="flex justify-center"
            key={teamName}
          >
            <Image
              src={`/images/teams/${teamName}${
                displayTeamObj[teamName] ? '' : '_gray_alpha'
              }.png`}
              width={48}
              height={48}
              alt={`${teamName} team logo`}
              quality={100}
              priority={false}
            />
          </button>
        ))}
      </div>
      <div className={tabContentStyle}>
        <div className="wrapper">
          <div className="row">
            <Cards
              allPlayers={allPlayers}
              displayFavorite={displayFavorite}
              displayTeamObj={displayTeamObj}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
