import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { Card } from '../components/Card'
import { Event } from '../components/Event'
import '../styles/Home.module.css'
import { Context } from '../utils/context'


export default function Home() {

  const {state, dispatch} = useContext(Context);
  
  useEffect(() => {
    console.log("STATE", state);
  })
  return (
    <div className="mainMain primaryL">
      <Head>
        <title>Marg' Betz</title>
        <meta name="description" content="Decentralized betting esport gaming crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-around'>
        <Card title="Katowice 2022"/>
        <Event title="Katowice 2022"/>
        <Event title="Katowice 2021"/>
      </div>
    </div>
  )
}
