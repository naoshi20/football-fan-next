import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.scss' // globalで当てたいcssはmainから一括で読み込む
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://kit.fontawesome.com/89eefaaa61.js"
        strategy="beforeInteractive"
        onLoad={() => console.log(`script loaded correctly`)}
      />
    </>
  )
}
