import { render } from '@testing-library/react'
import Card from './card.component'

// StarButtonコンポーネントのモック作成
jest.mock('../star-button/star-button.component', () => {
  return function DummyStarButton({ favorite }) {
    return <div data-testid="star-button">{favorite}</div>
  }
})

describe('Card Componentをレンダリングした時、', () => {
  let getByRole, getByTestId, clickCallBack, aTag, starButton, img, imgSrc

  beforeEach(() => {
    clickCallBack = jest.fn()
  })
  describe('選手データが存在する場合、', () => {
    beforeEach(() => {
      imgSrc = 'https://example.com/player.jpg'
      const props = {
        id: '1',
        japanese_name: 'テスト',
        belongings: 'テスト',
        favorite: false,
        img: imgSrc,
        clickCallBack: clickCallBack
      }

      const renderResult = render(<Card {...props} />)

      getByRole = renderResult.getByRole
      getByTestId = renderResult.getByTestId
      aTag = getByRole('link')
      img = getByRole('img')
      starButton = getByTestId('star-button')
    })

    test('リンクの遷移先が正しい遷移先になっていること', async () => {
      expect(aTag).toHaveAttribute('href', `/players/1`)
    })

    test('スターボタンがレンダリングされていること', async () => {
      expect(starButton).toBeInTheDocument()
    })

    test('imgが存在する場合には、該当の画像が表示されること', async () => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(imgSrc))
      )
    })
  })

  describe('選手データが存在する場合、', () => {
    let defaultImgSrc

    beforeEach(() => {
      defaultImgSrc = '/images/sample-person.jpg'
      const props = {
        id: '123',
        japanese_name: 'テスト',
        belongings: 'テスト',
        favorite: false,
        img: '',
        clickCallBack: clickCallBack
      }
      const renderResult = render(<Card {...props} />)

      getByRole = renderResult.getByRole
      img = getByRole('img')
    })

    test('サンプル画像が表示されること', async () => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(defaultImgSrc))
      )
    })
  })
})
