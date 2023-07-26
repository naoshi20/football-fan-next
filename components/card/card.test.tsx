import { render } from '@testing-library/react'
import Card from './card.component'

// StarButtonコンポーネントのモック作成
jest.mock('../star-button/star-button.component', () => {
  return function DummyStarButton({ favorite }) {
    return <div data-testid="star-button">{favorite}</div>
  }
})

describe('When the Card Component is rendered,', () => {
  let getByRole, getByTestId, clickCallBack, aTag, starButton, img, imgSrc

  beforeEach(() => {
    clickCallBack = jest.fn()
  })

  describe('When the player data is provided,', () => {
    beforeEach(() => {
      imgSrc = 'https://example.com/player.jpg'
      const props = {
        id: '1',
        japanese_name: 'Test',
        belongings: 'Test',
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

    it('Should have the correct link destination', async () => {
      expect(aTag).toHaveAttribute('href', `/players/1`)
    })

    it('Should render the StarButton', async () => {
      expect(starButton).toBeInTheDocument()
    })

    it('Should display the correct image when an image url is provided', async () => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(imgSrc))
      )
    })
  })

  describe('When the player data does not include an image url,', () => {
    let defaultImgSrc

    beforeEach(() => {
      defaultImgSrc = '/images/sample-person.jpg'
      const props = {
        id: '123',
        japanese_name: 'Test',
        belongings: 'Test',
        favorite: false,
        img: '',
        clickCallBack: clickCallBack
      }
      const renderResult = render(<Card {...props} />)

      getByRole = renderResult.getByRole
      img = getByRole('img')
    })

    it('Should display the default sample image', async () => {
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(defaultImgSrc))
      )
    })
  })
})
