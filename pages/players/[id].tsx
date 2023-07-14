import Head from 'next/head'
import Base, { siteTitle } from '../../components/base/base'
import { getAllPlayerIds } from '../../lib/get-all-player-ids'
import { getPlayerData } from '../../lib/get-player'

export default function Player({ playerData }) {
  console.log(playerData)
  return (
    <Base home={false}>
      {/* Baseにchildren propsとして渡される */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article>
        {playerData.map(({ id, japanese_name, team }) => (
          <>
            <h1 className="">{japanese_name}</h1>
            <div className="">{team}</div>
          </>
        ))}
      </article>
    </Base>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPlayerIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const playerData = await getPlayerData(params.id)
  return {
    props: {
      playerData
    }
  }
}
