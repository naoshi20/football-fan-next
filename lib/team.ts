import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function downloadTeamImage(team: string) {
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

    console.log(data)
    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return
  }
}

export async function getAllTeamImage() {
  const allTeamImages = await listAllFilesInTeamBucket()
  if (allTeamImages) {
    for (const teamImage of allTeamImages) {
      const teamName = teamImage.name.replace('.png', '')
      console.log(await getPublicURLTeamImage(teamName))
    }
  }
}

export async function getPublicURLTeamImage(team: string) {
  const supabase = createClientComponentClient()
  const { data } = supabase.storage
    .from('public-bucket')
    .getPublicUrl(`22-23_teams/48/${team}.png`)
  console.log(data)
  console.log(data)
  return data
}
