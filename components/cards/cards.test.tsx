import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cards from './cards.component'
import { updatePlayer } from '../../lib/player'

jest.mock('../../lib/player', () => ({
  updatePlayer: jest.fn()
}))

const mockAllPlayers = [
  {
    belongings: 'アーセナル',
    favorite: false,
    id: 1,
    img: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p225321.png',
    japanese_name: 'アーロン・ラムズデール'
  },
  {
    belongings: 'ブライトン',
    favorite: true,
    id: 2,
    img: '',
    japanese_name: '三笘薫'
  }
]

const favoritePlayer = mockAllPlayers.find(player => player.favorite)
const nonFavoritePlayer = mockAllPlayers.find(player => !player.favorite)

let favoritePlayerName = ''
let nonFavoritePlayerName = ''

if (favoritePlayer) {
  favoritePlayerName = favoritePlayer.japanese_name
}

if (nonFavoritePlayer) {
  nonFavoritePlayerName = nonFavoritePlayer.japanese_name
}

describe('Cards component', () => {
  let mockDisplayTeamObj
  describe('when displayFavorite is false', () => {
    it('renders cards for all players when all teams are selected', async () => {
      mockDisplayTeamObj = { ARS: true, BHA: true }
      render(
        <Cards
          allPlayers={mockAllPlayers}
          displayFavorite={false}
          displayTeamObj={mockDisplayTeamObj}
        />
      )

      expect(screen.getByText(favoritePlayerName)).toBeInTheDocument()
      expect(screen.getByText(nonFavoritePlayerName)).toBeInTheDocument()
    })

    it('only renders cards for players in selected teams when some teams are selected', () => {
      mockDisplayTeamObj = { ARS: false, BHA: true }
      render(
        <Cards
          allPlayers={mockAllPlayers}
          displayFavorite={false}
          displayTeamObj={mockDisplayTeamObj}
        />
      )

      expect(screen.getByText(favoritePlayerName)).toBeInTheDocument()
      expect(screen.queryByText(nonFavoritePlayerName)).not.toBeInTheDocument()
    })
  })

  describe('when displayFavorite is true', () => {
    it('only displays cards for favorite players when all teams are selected', () => {
      mockDisplayTeamObj = { ARS: true, BHA: true }
      render(
        <Cards
          allPlayers={mockAllPlayers}
          displayFavorite={true}
          displayTeamObj={mockDisplayTeamObj}
        />
      )

      expect(screen.getByText(favoritePlayerName)).toBeInTheDocument()
      expect(screen.queryByText(nonFavoritePlayerName)).not.toBeInTheDocument()
    })

    it('renders cards for favorite players within the selected teams when some teams are selected', () => {
      mockDisplayTeamObj = { ARS: false, BHA: true }
      render(
        <Cards
          allPlayers={mockAllPlayers}
          displayFavorite={true}
          displayTeamObj={mockDisplayTeamObj}
        />
      )

      expect(screen.getByText(favoritePlayerName)).toBeInTheDocument()
      expect(screen.queryByText(nonFavoritePlayerName)).not.toBeInTheDocument()
    })

    it('updates favorite status and calls updatePlayer function when favorite card is clicked', async () => {
      mockDisplayTeamObj = { ARS: false, BHA: true }
      render(
        <Cards
          allPlayers={mockAllPlayers}
          displayFavorite={true}
          displayTeamObj={mockDisplayTeamObj}
        />
      )

      if (favoritePlayer) {
        await userEvent.click(screen.getByRole('checkbox'))

        expect(updatePlayer).toHaveBeenCalledWith(favoritePlayer.id, false)
      }
    })
  })
})
