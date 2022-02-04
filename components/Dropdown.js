/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import burger from '../public/white_burger.svg'

export const DDown = ({ onlyMobile, navItem }) => {
  return (
    <Menu as="div" className={onlyMobile ? "relative inline-block text-left lg:hidden" : null}>
      <div>

        <Menu.Button className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <Image src={burger} alt="menu burger" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {navItem
              ? navItem.map((item, i) => {
                return <Menu.Item key={i}>
                  {
                    <a
                      href={item.url}
                      className={'bg-gray-100 text-gray-900 block px-4 py-2 text-sm'}
                    >
                      {item.name}
                    </a>
                  }
                </Menu.Item>

              })
              : null}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
