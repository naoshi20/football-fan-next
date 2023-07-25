import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Card from './card.component'

const user = userEvent.setup()
test('カードをレンダリングすると、リンクの遷移先が正しい遷移先になっていること', async () => {
  const mockFn = jest.fn()
  render(
    <Card
      id={1}
      img={
        'https://resources.premierleague.com/premierleague/photos/players/250x250/p225321.png'
      }
      japanese_name={'テスト'}
      belongings={'arsenal'}
      favorite={true}
      clickCallBack={mockFn}
    />
  )
  const aTag = screen.getByRole('link')
  expect(aTag).toHaveAttribute('href', `/players/1`)
})

test('カードをレンダリングすると、スターボタンがレンダリングされていること', async () => {
  const mockFn = jest.fn()
  render(
    <Card
      id={1}
      img={
        'https://resources.premierleague.com/premierleague/photos/players/250x250/p225321.png'
      }
      japanese_name={'テスト'}
      belongings={'arsenal'}
      favorite={true}
      clickCallBack={mockFn}
    />
  )
  await user.click(screen.getByRole('button'))
  expect(mockFn).toBeCalled()
})

test('imgが存在する場合には、該当の画像が表示されること', async () => {
  const mockFn = jest.fn()
  render(
    <Card
      id={1}
      img={
        'https://resources.premierleague.com/premierleague/photos/players/250x250/p225321.png'
      }
      japanese_name={'テスト'}
      belongings={'arsenal'}
      favorite={true}
      clickCallBack={mockFn}
    />
  )
  await user.click(screen.getByRole('button'))
  expect(mockFn).toBeCalled()
})

test('imgが存在しない場合には、サンプル画像が表示されること', async () => {
  const mockFn = jest.fn()
  render(
    <Card
      id={1}
      img={
        'https://resources.premierleague.com/premierleague/photos/players/250x250/p225321.png'
      }
      japanese_name={'テスト'}
      belongings={'arsenal'}
      favorite={true}
      clickCallBack={mockFn}
    />
  )
  await user.click(screen.getByRole('button'))
  expect(mockFn).toBeCalled()
})
