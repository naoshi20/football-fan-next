import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export const DATABASE_TABLE_NAME = 'players'

export async function getPlayers(): Promise<any> {
  const supabase = createClientComponentClient()
  const env = process.env.NODE_ENV

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

    return result.data
  } catch (error) {
    console.log('Error loading user data!')
  }
}
