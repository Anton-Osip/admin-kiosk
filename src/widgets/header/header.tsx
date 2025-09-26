'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import React from 'react';

import Logotype from '@/shared/assets/logotype';

import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.logoSection}>
        <Link href="/">
          <Logotype width={125} height={83} />
        </Link>
      </div>
    </header>
  );
}
