import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import StarButton from './star-button.component'

const user = userEvent.setup()

test('ボタンをクリックすると、コールバック関数がよばれる', async () => {
  const mockFn = jest.fn()
  render(<StarButton playerId="1" favorite={true} clickCallBack={mockFn} />)
  await user.click(screen.getByRole('button'))
  expect(mockFn).toBeCalled()
})

test('ONの状態で、ボタンをクリックすると、OFFになる', async () => {
  const mockFn = jest.fn()
  render(<StarButton playerId="1" favorite={true} clickCallBack={mockFn} />)
  const starButton = screen.getByRole('button')
  await user.click(starButton)
  expect(starButton).toHaveClass('fa-solid')
})

test('OFFの状態で、ボタンをクリックすると、ONになる', async () => {
  const mockFn = jest.fn()
  render(<StarButton playerId="1" favorite={false} clickCallBack={mockFn} />)
  const starButton = screen.getByRole('button')
  await user.click(starButton)
  expect(starButton).toHaveClass('fa-regular')
})
