import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function updatePlayer(playerId, favorite): Promise<any> {
  const supabase = createClientComponentClient()

  try {
    const { data, error, status } = await supabase
      .from('players5')
      .update({ favorite: favorite })
      .eq('id', playerId)
      .select()

    if (error && status !== 406) {
      throw error
    }

    return data
  } catch (error) {
    alert('Error loading user data!')
  }
}
