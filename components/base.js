import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

// 全ページ共通のタグを定義
export default function Base({ children, home }) {
    return (
        <div className={styles.container}>
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
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(
                        `script loaded correctly, window.FB has been populated`
                    )
                }
            />

            {/* 共通ヘッダー */}
            <header className={styles.header}>
                {home ? (
                    <>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt={name}
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>

            {/* メインのコンテンツ */}
            <main>{children}</main>

            {/* ホームではない場合はホームヘ戻るボタンを表示 */}
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}
