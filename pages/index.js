import Head from 'next/head'
import { Event } from '../components/Event'
import '../styles/Home.module.css'
import AllMatches from './matches'

export default function Home() {
  return (
    <div className="mainMain primaryL">
      <Head>
        <title>Marg' Betz</title>
        <meta name="description" content="Decentralized betting esport gaming crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-around'>
        <Event title="Katowice 2022"/>
        <Event title="Katowice 2021"/>
      </div>
    </div>
  )
}
