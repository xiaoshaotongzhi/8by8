import type { PropsWithChildren } from 'react';
import '../../styles/main.scss';
import styles from './styles.module.scss';

export function GlobalStylesProvider({ children }: PropsWithChildren) {
  return <div className={styles.font_provider}>{children}</div>;
}
