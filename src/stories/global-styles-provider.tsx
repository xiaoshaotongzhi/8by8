import { bebasNeue } from '../fonts/bebas-neue';
import { lato } from '../fonts/lato';
import type { PropsWithChildren } from 'react';
import '../styles/main.scss';

export function GlobalStylesProvider({ children }: PropsWithChildren) {
  return (
    <div className={`${bebasNeue.variable} ${lato.variable}`}>{children}</div>
  );
}
