import Head from 'next/head'
import styles from '../styles/Home.module.css'

import AllMatches from './matches'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Margot Betz</title>
        <meta name="description" content="Decentralized betting esport gaming crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllMatches />
    </div>
  )
}
