import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import React from 'react'
import card from './card.module.scss'
import StarButton from './star-button'

const buttonStyle =
  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-black-400 focus:outline-none focus:ring-2'
const selectedButtonStyle = 'bg-white shadow'
const unselectedButtonStyle =
  'text-blue-100 hover:bg-white/[0.12] hover:text-white'
const tabContentStyle =
  'rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'

export default function MyTabs({ allPlayers }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected
                  ? buttonStyle + ' ' + selectedButtonStyle
                  : buttonStyle + ' ' + unselectedButtonStyle
              }
            >
              お気に入り
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={
                selected
                  ? buttonStyle + ' ' + selectedButtonStyle
                  : buttonStyle + ' ' + unselectedButtonStyle
              }
            >
              全選手
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className={tabContentStyle}>
          <div className="wrapper">
            <div className="row">
              {allPlayers.map(({ id, japanese_name, belongings, img }) => (
                <div key={id} className="col-md-3 col-sm-4 col-6">
                  <a>
                    <div className={`card ${card.card}`}>
                      <StarButton></StarButton>
                      <>
                        {img ? (
                          <Image
                            src={img}
                            width={500}
                            height={500}
                            alt="Picture of the player"
                            quality={100}
                            priority={false}
                            className={card.cardImgTop}
                          />
                        ) : (
                          <Image
                            src="/images/sample-person.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the player"
                            quality={100}
                            priority={false}
                            className={card.cardImgTop}
                          />
                        )}
                      </>
                      <div className="card-body">
                        <p>{japanese_name}</p>
                        <h5>{belongings}</h5>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Tab.Panel>
        <Tab.Panel className={tabContentStyle}>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
