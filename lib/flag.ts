import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFlagData(country: string) {
  const supabase = createClientComponentClient()
  try {
    console.log(country)
    const { data, error } = await supabase.storage
      .from('images')
      .download(`flags/${country}.png`)
    if (error) {
      throw error
    }

    console.log(data)
    const url = { url: URL.createObjectURL(data) }
    console.log(url)
    return url
  } catch (error) {
    console.log('Error downloading image: ', error)
    return
  }
}
