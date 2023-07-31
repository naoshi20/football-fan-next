import Head from 'next/head'
import Base, { siteTitle } from '../components/base/base'
import { PlayerService } from '..//lib/playerService'
import MyTabs from '../components/mytabs/mytabs'

export default function Home({ allPlayers }) {
  return (
    <Base home={true}>
      {/* Baseにchildren propsとして渡される */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <MyTabs allPlayers={allPlayers}></MyTabs>
    </Base>
  )
}

export async function getStaticProps() {
  const playerService = new PlayerService()
  const allPlayers = await playerService.getPlayers()
  return {
    props: {
      allPlayers
    }
  }
}
