import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFlagData(country: string) {
  const supabase = createClientComponentClient()
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .download(`flags/${country}.png`)
    if (error) {
      throw error
    }

    const url = { url: URL.createObjectURL(data) }
    return url
  } catch (error) {
    console.log('Error downloading image: ', error)
    return
  }
}
