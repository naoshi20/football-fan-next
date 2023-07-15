import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getTeamImage(team: string) {
  const supabase = createClientComponentClient()
  try {
    console.log(team)
    const { data, error } = await supabase.storage
      .from('images')
      .download(`22-23_teams/48/${team}.png`)
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
