import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import StarButton from './star-button.component'

describe('StarButtonを、', () => {
  let getByRole, getByTestId, queryByTestId, clickCallBack, checkbox, playerId

  beforeEach(() => {
    clickCallBack = jest.fn()
    playerId = 1
  })

  describe('favoriteがfalseでレンダリングした時、', () => {
    beforeEach(() => {
      const favorite = false
      const renderResult = render(
        <StarButton
          playerId={playerId}
          favorite={favorite}
          clickCallBack={clickCallBack}
        />
      )
      getByRole = renderResult.getByRole
      getByTestId = renderResult.getByTestId
      queryByTestId = renderResult.queryByTestId
      checkbox = getByRole('checkbox')
    })
    test('OFF状態で表示されること。', async () => {
      expect(checkbox).not.toBeChecked()
      expect(getByTestId('star-regular-icon')).toBeInTheDocument()
      expect(queryByTestId('star-solid-icon')).not.toBeInTheDocument()
    })
    test('ボタンをクリックすると、コールバック関数がよばれること。またコールバック関数はplayerIdを引数として実行されていること。', async () => {
      await userEvent.click(screen.getByRole('checkbox'))
      expect(clickCallBack).toHaveBeenCalledTimes(1)
      expect(clickCallBack).toHaveBeenCalledWith(playerId)
    })
  })

  describe('favoriteがtrueでレンダリングした時、', () => {
    beforeEach(() => {
      const favorite = true
      const renderResult = render(
        <StarButton
          playerId={playerId}
          favorite={favorite}
          clickCallBack={clickCallBack}
        />
      )
      getByRole = renderResult.getByRole
      getByTestId = renderResult.getByTestId
      queryByTestId = renderResult.queryByTestId
      checkbox = getByRole('checkbox')
    })
    test('ON状態で表示されること。', async () => {
      expect(checkbox).toBeChecked()
      expect(getByTestId('star-solid-icon')).toBeInTheDocument()
      expect(queryByTestId('star-regular-icon')).not.toBeInTheDocument()
    })
    test('ボタンをクリックすると、コールバック関数がよばれること。またコールバック関数はplayerIdを引数として実行されていること。', async () => {
      await userEvent.click(screen.getByRole('checkbox'))
      expect(clickCallBack).toHaveBeenCalledTimes(1)
      expect(clickCallBack).toHaveBeenCalledWith(playerId)
    })
  })
})
