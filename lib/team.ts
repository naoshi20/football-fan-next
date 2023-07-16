import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function downloadTeamImage(team: string) {
  const supabase = createClientComponentClient()
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .download(`22-23_teams/48/${team}.png`)
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

export async function listAllFilesInTeamBucket() {
  const supabase = createClientComponentClient()
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .list('22-23_teams/48', {
        limit: 100
        // offset: 0
        // sortBy: { column: 'name', order: 'asc' }
      })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return
  }
}
