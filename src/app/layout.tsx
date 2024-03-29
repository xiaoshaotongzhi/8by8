import type { Metadata } from 'next';
import '../styles/main.scss';
import { bebasNeue } from '@/fonts/bebas-neue';
import { lato } from '@/fonts/lato';
import { ServicesContextProvider } from '@/contexts/services-context';
import { UserContextProvider } from '@/contexts/user-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: '8by8 Challenge',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${lato.variable}`}>
        <ServicesContextProvider>
          <UserContextProvider>
            <Header />
            {children}
            <Footer />
          </UserContextProvider>
        </ServicesContextProvider>
      </body>
    </html>
  );
}
