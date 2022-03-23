import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { useTheme } from '../../contexts/themeContext';
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  const {
    toggleTheme,
    isLightTheme,
  } = useTheme();

  return (
    <header className={styles.headerContainer}>
      <Link href='/'>
        <img src="/logo.svg" alt="Podcastr" />
      </Link>

      <p>O melhor para você, sempre</p>

      <span>{currentDate}</span>

      <button type='button' onClick={toggleTheme} className={isLightTheme ? styles.light : styles.dark}>
        {isLightTheme ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
      </button>

    </header>
  )
}