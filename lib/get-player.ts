import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DATABASE_TABLE_NAME } from './get-players'
import { Player } from '../model/player.model'

export async function getPlayerData(playerId: number): Promise<Player | null> {
  const supabase = createClientComponentClient()

  try {
    const { data, error, status } = await supabase
      .from(DATABASE_TABLE_NAME)
      .select()
      .eq('id', playerId)

    if (error && status !== 406) {
      throw error
    }

    if (!data) {
      return null
    }

    return data[0] as Player
  } catch (error) {
    console.log('Error loading user data!')
    return null
  }
}
