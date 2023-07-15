import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DATABASE_TABLE_NAME } from './get-players'

export async function getAllPlayerIds(): Promise<
  { [key: string]: { id: any } }[] | null
> {
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
    return result.data.map(player => {
      return {
        params: {
          id: player.id.toString()
        }
      }
    })
  } catch (error) {
    console.log('Error loading user data!')
  }
  return null
}
