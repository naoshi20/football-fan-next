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
                <li
                  className="w-full flex justify-between py-2"
                  style={{ textAlign: 'center' }}
                >
                  <p className="w-1/2">ポジション</p>
                  <p className="w-1/2">{playerData.position}</p>
                </li>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <li
                  className="w-full flex justify-between  py-2"
                  style={{ textAlign: 'center' }}
                >
                  <p className="w-1/2">背番号</p>
                  <p className="w-1/2">{playerData.back_number}</p>
                </li>
                <hr
                  style={{
                    color: '#aaaaaa',
                    height: '4px'
                  }}
                />
                <li
                  className="w-full flex justify-between py-2"
                  style={{ textAlign: 'center' }}
                >
                  <p className="w-1/2">誕生日</p>
                  <p className="w-1/2">{playerData.birthday}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
