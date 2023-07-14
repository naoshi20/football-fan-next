import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getAllPlayerIds(): Promise<
  { [key: string]: { id: any } }[] | null
> {
  const supabase = createClientComponentClient()

  try {
    const { data, error, status } = await supabase
      .from('players5')
      .select('*')
      .order('id', { ascending: true })
      .limit(10)

    if (error && status !== 406) {
      throw error
    }
    if (!data) {
      throw error
    }
    return data.map(player => {
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
