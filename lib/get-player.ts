import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getPlayerData(playerId: number) {
  const supabase = createClientComponentClient()

  try {
    const { data, error, status } = await supabase
      .from('players5')
      .select()
      .eq('id', playerId)

    if (error && status !== 406) {
      throw error
    }

    return data
  } catch (error) {
    console.log('Error loading user data!')
  }
}
