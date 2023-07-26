import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import StarButton from './star-button.component'
describe('StarButton', () => {
  let getByRole, getByTestId, queryByTestId, clickCallBack, checkbox, playerId

  beforeEach(() => {
    clickCallBack = jest.fn()
    playerId = 1
  })

  describe('when favorite is false', () => {
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
    it('displays in the OFF state.', () => {
      expect(checkbox).not.toBeChecked()
      expect(getByTestId('star-regular-icon')).toBeInTheDocument()
      expect(queryByTestId('star-solid-icon')).not.toBeInTheDocument()
    })
    it('calls the callback function with playerId as an argument when the button is clicked.', async () => {
      await userEvent.click(screen.getByRole('checkbox'))
      expect(clickCallBack).toHaveBeenCalledTimes(1)
      expect(clickCallBack).toHaveBeenCalledWith(playerId)
    })
  })

  describe('when favorite is true', () => {
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
    it('displays in the ON state.', () => {
      expect(checkbox).toBeChecked()
      expect(getByTestId('star-solid-icon')).toBeInTheDocument()
      expect(queryByTestId('star-regular-icon')).not.toBeInTheDocument()
    })
    it('calls the callback function with playerId as an argument when the button is clicked.', async () => {
      await userEvent.click(screen.getByRole('checkbox'))
      expect(clickCallBack).toHaveBeenCalledTimes(1)
      expect(clickCallBack).toHaveBeenCalledWith(playerId)
    })
  })
})
