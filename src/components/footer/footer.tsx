import Link from 'next/link';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineInstagram,
} from 'react-icons/ai';
import styles from './styles.module.scss';

export function Footer() {
  return (
    <div className={styles.footer_container}>
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <Link
            className={styles.link}
            href="https://www.facebook.com/8by8vote/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="open 8by8 Facebook page"
          >
            <AiFillFacebook />
          </Link>
          <Link
            className={styles.link}
            href="https://www.linkedin.com/company/8by8vote/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="open 8by8 LinkedIn page"
          >
            <AiFillLinkedin />
          </Link>
          <Link
            className={styles.link}
            href="https://www.instagram.com/8by8vote/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="open 8by8 Instagram page"
          >
            <AiOutlineInstagram />
          </Link>
        </div>
        <div className={styles.description}>
          <p>Copyright © 2021</p>
          <p>
            8BY8 is a nonprofit organization dedicated to stopping hate against
            Asian American Pacific Islander communities through voter
            registration and turnout.
          </p>
        </div>
      </footer>
    </div>
  );
}
