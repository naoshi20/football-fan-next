import Head from 'next/head'
import Script from 'next/script'

import Link from 'next/link'
import React from 'react'

export const siteTitle = 'Next.js Sample Website'

// 全ページ共通のタグを定義
export default function Base({ children, home }) {
  return (
    <div>
      {/* Head内に書かれたものは自動で<head>内にレンダリングされる */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Script内に書かれたものは自動で<script>内にレンダリングされる */}
      <Script
        id="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />

      {/* 共通ヘッダー */}
      <header>{home ? <></> : <></>}</header>

      {/* メインのコンテンツ */}
      <main>{children}</main>

      {/* ホームではない場合はホームヘ戻るボタンを表示 */}
      {/* TODO|| なぜ&&? */}
      {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}
