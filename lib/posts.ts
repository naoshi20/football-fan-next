import path from 'path'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export async function getPlayers(from?): Promise<any> {
  // const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  try {
    // setLoading(true)

    let { data, error, status } = await supabase
      .from('players5')
      .select('*')
      .order('id', { ascending: true })
      .limit(10)

    if (error && status !== 406) {
      throw error
    }

    // if (data) {
    //   setFullname(data.full_name)
    //   setUsername(data.username)
    //   setWebsite(data.website)
    //   setAvatarUrl(data.avatar_url)
    // }
    // console.log(data)
    return data
  } catch (error) {
    alert('Error loading user data!')
  } finally {
    // setLoading(false)
  }
}
