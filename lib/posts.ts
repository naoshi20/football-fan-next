import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getPlayers(from?): Promise<any> {
  const supabase = createClientComponentClient()

  try {
    let { data, error, status } = await supabase
      .from('players5')
      .select('*')
      .order('id', { ascending: true })

    if (error && status !== 406) {
      throw error
    }

    return data
  } catch (error) {
    alert('Error loading user data!')
  }
}
