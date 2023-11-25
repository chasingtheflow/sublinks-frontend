import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import cx from 'classnames';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
import BottomNav, { NAV_HEIGHT } from '@/components/bottom-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sublinks',
  description: 'Sublinks',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <html lang="en">
    <body className={cx(inter.className, `dark:bg-gray-700 max-md:pb-${NAV_HEIGHT}`)}>
      <Header />
      <main className="h-full l:max-w-[1352px] xl:max-w-[1524px] m-auto border-x dark:border-gray-900">{children}</main>
      <BottomNav />
    </body>
  </html>
);

export default RootLayout;
