import Head from 'next/head'
import Base, { siteTitle } from '../../components/base/base'
import { getAllPlayerIds } from '../../lib/player'
import { getPlayerData } from '../../lib/player'
import Image from 'next/image'
import { Player } from '../../model/player.model'
import { getFlagData } from '../../lib/flag'
import { useEffect, useState } from 'react'
import { getTeamImage } from '../../lib/team'
import { ABBREVIATED_TEAM_NAME } from '../../model/team.model'

export default function Player({ playerData }) {
  const [flagUrl, setFlagUrl] = useState('')
  const [teamImageUrl, setTeamImageUrl] = useState('')

  const useEffectCallbackForFlag = async () => {
    const flag = await getFlagData(playerData.country_code)
    if (flag) {
      setFlagUrl(flag.url)
    }
  }
  const useEffectCallbackForTeamImage = async () => {
    const image = await getTeamImage(
      ABBREVIATED_TEAM_NAME[playerData.belongings]
    )
    console.log('image')
    console.log(image)
    if (image) {
      setTeamImageUrl(image.url)
    }
  }

  useEffect(() => {
    useEffectCallbackForFlag()
    useEffectCallbackForTeamImage()
  }, [])

  return (
    <Base home={false}>
      {/* Baseにchildren propsとして渡される */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article>
        <h1 className="">{playerData.japanese_name}</h1>
        <p className="">{playerData.belongings}</p>
        {flagUrl ? (
          <Image
            width={22}
            height={14}
            src={flagUrl}
            alt="Avatar"
            className="avatar image"
            style={{ height: 14, width: 22 }}
          />
        ) : (
          <></>
        )}
        {teamImageUrl ? (
          <Image
            width={22}
            height={22}
            src={teamImageUrl}
            alt="Avatar"
            className="avatar image"
            style={{ height: 22, width: 22 }}
          />
        ) : (
          <></>
        )}
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
