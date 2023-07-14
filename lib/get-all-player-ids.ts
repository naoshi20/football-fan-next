import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getAllPlayerIds(): Promise<
  { [key: string]: { id: any } }[] | null
> {
  const supabase = createClientComponentClient()
  const env = process.env.NODE_ENV

  try {
    let result
    if (env == 'development') {
      result = await supabase
        .from('players5')
        .select('*')
        .order('id', { ascending: true })
        .limit(10)
    }

    if (env == 'production') {
      result = await supabase
        .from('players5')
        .select('*')
        .order('id', { ascending: true })
    }

    if (result.error && result.status !== 406) {
      throw result.error
    }
    return result.data.map(player => {
      console.log(player)
      console.log(player.id.toString())
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
