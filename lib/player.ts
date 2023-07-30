import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export const DATABASE_TABLE_NAME = 'players'
import { Player } from '../model/player.model'

// Create a Supabase client instance
const supabase = createClientComponentClient()
const env = process.env.NODE_ENV

export async function getPlayers(): Promise<Player[] | null> {
  try {
    let result
    if (env == 'development') {
      result = await supabase
        .from(DATABASE_TABLE_NAME)
        .select('*')
        .order('id', { ascending: true })
        .limit(40)
    }

    if (env == 'production') {
      result = await supabase
        .from(DATABASE_TABLE_NAME)
        .select('*')
        .order('id', { ascending: true })
    }

    if (result.error && result.status !== 406) {
      throw result.error
    }

    return result.data
  } catch (error) {
    console.log('Error loading user data!')
    return null
  }
}

export async function getPlayerData(playerId: number): Promise<Player | null> {
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

export async function getAllPlayerIds(): Promise<Player[] | null> {
  try {
    let result
    if (env == 'development') {
      result = await supabase
        .from(DATABASE_TABLE_NAME)
        .select('*')
        .order('id', { ascending: true })
        .limit(10)
    }

    if (env == 'production') {
      result = await supabase
        .from(DATABASE_TABLE_NAME)
        .select('*')
        .order('id', { ascending: true })
    }

    if (result.error && result.status !== 406) {
      throw result.error
    }
    return result.data.map(player => {
      return {
        params: {
          id: player.id.toString()
        }
      }
    })
  } catch (error) {
    console.log('Error loading user data!')
    return null
  }
}

export async function updatePlayer(
  playerId: number,
  favorite: boolean
): Promise<Player[] | null> {
  try {
    const { data, error } = await supabase
      .from(DATABASE_TABLE_NAME)
      .update({ favorite: favorite })
      .eq('id', playerId)

    if (error) {
      throw error
    }

    if (data) {
      return data as Player[]
    }

    return null
  } catch (error) {
    console.error(`Error updating player data: ${error.message}`)
    return null
  }
}
