import { useState } from 'react'
import Card from '../card/card.component'
import { PlayerService } from '../../lib/playerService'
import { ABBREVIATED_TEAM_NAME } from '../../model/team.model'

export default function cards({ allPlayers, displayFavorite, displayTeamObj }) {
  const [currentAllPlayers, setAllPlayersState] = useState(allPlayers)

  function updatePlayersFavoriteStatus(playerId) {
    // constで宣言しているのでコピーしたものをアップデートしてセットする
    const nextAllPlayersState = [...currentAllPlayers]
    const targetPlayerIndex = nextAllPlayersState.findIndex(
      player => player.id === playerId
    )
    nextAllPlayersState[targetPlayerIndex].favorite =
      !nextAllPlayersState[targetPlayerIndex].favorite
    setAllPlayersState(nextAllPlayersState)
    const playerService = new PlayerService()
    playerService.updatePlayer(
      playerId,
      nextAllPlayersState[targetPlayerIndex].favorite
    )
  }

  return (
    <>
      {currentAllPlayers &&
        currentAllPlayers.length > 0 &&
        currentAllPlayers
          .filter(player =>
            // favoriteタブならfilterかけるが、そうでなければ全ての行を返す
            displayFavorite ? player.favorite === true : true
          )
          .filter(
            player => displayTeamObj[ABBREVIATED_TEAM_NAME[player.belongings]]
          )
          .map(({ id, japanese_name, belongings, img, favorite }) => (
            <Card
              // keyに一意なidをセットすることでタブ切り替えの際にリレンダリングされるのを防ぐ
              key={id}
              id={id}
              japanese_name={japanese_name}
              belongings={belongings}
              img={img}
              favorite={favorite}
              clickCallBack={updatePlayersFavoriteStatus}
            ></Card>
          ))}
    </>
  )
}
