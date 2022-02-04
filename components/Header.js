import { useEffect, useState } from 'react'
import Link from 'next/link'

import { ConnectMetamask } from "./ConnectMetamask"
import { DDown } from '../components/Dropdown'

import Image from 'next/image'
// import logo from '../public/logo.png'

export const Header = () => {

  const navItem = [
    {
      name: "Events",
      url: "/events",
    },
    {
      name: "Matches",
      url: "/matches",
    },
    {
      name: "Roadmap",
      url: "#roadmap",
    },
    {
      name: "Team",
      url: "#team",
    },
  ]

  return <nav className='header py-4 px-6 flex justify-between'>
    <div className='flex'>
      <Link href='/'>
        <div className='mr-10 cursor-pointer'>
          coucou
          {/* <Image src={logo} alt="logo" width="80" height="80"/> */}
        </div>
      </Link>
    </div>
    <div className='flex'>
      <div className='lg:hidden'>
        <DDown onlyMobile={true} navItem={navItem} />
      </div>
      <div className='hidden lg:flex lg:items-center'>
        {navItem.map((item, i) => {
          return <Link href={item.url} key={i}>
            <a className='mr-6'> {item.name} </a>
          </Link>
        })}
        <ConnectMetamask />
      </div>
    </div>
  </nav>
}

