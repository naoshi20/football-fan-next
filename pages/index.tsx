import Head from 'next/head'
import Base, { siteTitle } from '../components/base'
import { getPlayers } from '../lib/posts'
import MyTabs from '../components/mytabs'

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
  const allPlayers = await getPlayers()
  return {
    props: {
      allPlayers
    }
  }
}
