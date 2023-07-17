import { render } from '@testing-library/react'
import { SimpleButton } from './SimpleButton'

test('ボタンをクリックするとON/OFFの表示が切り替わる', async () => {
  render(<SimpleButton />, {})
})
