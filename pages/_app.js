import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className='border-b p-6'>
        <p className='text-4xl font-bold'>Bubble bets</p>
        <div className='flex mt-4'>
          <Link href='/'>
            <a className='mr-6 text-pink-500'>
              Home
            </a>
          </Link>
          <Link href='/events'>
            <a className='mr-6 text-pink-500'>
              Events
            </a>
          </Link>
          <Link href='/games'>
            <a className='mr-6 text-pink-500'>
              Games
            </a>
          </Link>
          <Link href='/results'>
            <a className='mr-6 text-pink-500'>
              Results
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
