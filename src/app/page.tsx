'use client';

import { useEffect, useRef } from 'react';

import { MOCK_AUTH_CREDENTIALS, useAuthStore, useKiosksStore } from '@/shared/lib';
import { Header, Orders, SideBarMenu } from '@/widgets';

import s from './page.module.scss';

export default function Home() {
  const { isAuthenticated, isLoading, login } = useAuthStore();
  const { fetchKiosks, kiosksData } = useKiosksStore();
  const hasTriedLogin = useRef(false);
  const hasFetchedKiosks = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !hasTriedLogin.current) {
      hasTriedLogin.current = true;
      login(MOCK_AUTH_CREDENTIALS);
    }
  }, [isAuthenticated, isLoading, login]);

  useEffect(() => {
    if (isAuthenticated && !hasFetchedKiosks.current) {
      hasFetchedKiosks.current = true;
      const timer = setTimeout(() => {
        fetchKiosks();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, fetchKiosks]);

  return (
    <div className={s.container}>
      <SideBarMenu />
      <div className={s.content}>
        <Header />
        <Orders />
      </div>
    </div>
  );
}
