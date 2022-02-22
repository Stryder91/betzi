import '../styles/globals.css'
import { Header } from '../components/Header';
import { Provider } from '../utils/context';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider >
        <Header />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp
