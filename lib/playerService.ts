import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Player } from '../model/player.model'

export const DATABASE_TABLE_NAME = 'players'

export class PlayerService {
  private supabase
  private env

  constructor(supabase = createClientComponentClient()) {
    this.supabase = supabase
    this.env = process.env.NODE_ENV
  }

  async getPlayers(): Promise<Player[] | null> {
    try {
      let result
      if (this.env == 'development') {
        result = await this.supabase
          .from(DATABASE_TABLE_NAME)
          .select('*')
          .order('id', { ascending: true })
          .limit(40)
      }

      if (this.env == 'production') {
        result = await this.supabase
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

  async getPlayerData(playerId: number): Promise<Player | null> {
    try {
      const { data, error, status } = await this.supabase
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

  async getAllPlayerIds(): Promise<Player[] | null> {
    try {
      let result
      if (this.env == 'development') {
        result = await this.supabase
          .from(DATABASE_TABLE_NAME)
          .select('*')
          .order('id', { ascending: true })
          .limit(10)
      }

      if (this.env == 'production') {
        result = await this.supabase
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

  async updatePlayer(
    playerId: number,
    favorite: boolean
  ): Promise<Player[] | null> {
    try {
      const { data, error } = await this.supabase
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
}
