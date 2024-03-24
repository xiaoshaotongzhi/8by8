import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { HeaderContextProvider } from './header-context';
import { IconsTray } from './icons-tray';
import { HamburgerMenu } from './hamburger-menu';
import { SignoutModal } from './signout-modal';
import logo from '../../../public/static/images/shared/8by8-logo.svg';
import styles from './styles.module.scss';

export function Header() {
  return (
    <HeaderContextProvider>
      <IconContext.Provider value={{ color: 'white' }}>
        <header className={styles.header}>
          <div className={styles.header_content}>
            <Link href={'/'} className={styles.brand_link}>
              <Image src={logo} alt="8by8 logo" className={styles.brand_logo} />
            </Link>
            <IconsTray />
          </div>
        </header>
        <HamburgerMenu />
        <SignoutModal />
      </IconContext.Provider>
    </HeaderContextProvider>
  );
}
