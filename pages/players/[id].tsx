import Head from 'next/head'
import Base, { siteTitle } from '../../components/base/base'
import { PlayerService } from '../../lib/playerService'
import Image from 'next/image'
import { Player } from '../../model/player.model'
import { getFlagData } from '../../lib/flag'
import { useEffect, useState } from 'react'
import { downloadTeamImage } from '../../lib/team'
import { ABBREVIATED_TEAM_NAME } from '../../model/team.model'
import PropertyRow from '../../components/property-row/property-row'

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
    const image = await downloadTeamImage(
      ABBREVIATED_TEAM_NAME[playerData.belongings]
    )

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
        <div className="w-full flex justify-center">
          <div>
            {playerData.img ? (
              <Image
                width={220}
                height={220}
                src={playerData.img}
                alt="Avatar"
                className="avatar image"
                style={{ height: 220, width: 220 }}
              />
            ) : (
              <></>
            )}
            <div className="flex justify-center mt-6">
              <h1 className="">{playerData.japanese_name}</h1>
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex">
                {flagUrl ? (
                  <Image
                    width={22}
                    height={14}
                    src={flagUrl}
                    alt="Avatar"
                    className="avatar image mr-3"
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
              </div>
            </div>
            <div className="mt-6">
              <ul>
                <PropertyRow k="所属" v={playerData.belongings}></PropertyRow>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <PropertyRow
                  k="ナショナリティ"
                  v={playerData.country}
                ></PropertyRow>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <PropertyRow
                  k="ポジション"
                  v={playerData.position}
                ></PropertyRow>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <PropertyRow
                  k="背番号"
                  v={playerData.back_number}
                ></PropertyRow>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <PropertyRow k="誕生日" v={playerData.birthday}></PropertyRow>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Base>
  )
}

export async function getStaticPaths() {
  const playerService = new PlayerService()
  const paths = await playerService.getAllPlayerIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const playerService = new PlayerService()
  const playerData = await playerService.getPlayerData(params.id)
  return {
    props: {
      playerData
    }
  }
}
