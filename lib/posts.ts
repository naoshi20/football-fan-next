import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getPlayers(): Promise<any> {
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

    return data
  } catch (error) {
    alert('Error loading user data!')
  }
}
