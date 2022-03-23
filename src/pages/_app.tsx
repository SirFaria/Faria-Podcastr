import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/playerContext';
import { ThemeContextProvider } from '../contexts/themeContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
