'use client';

import { useEffect, useRef } from 'react';

import { MOCK_AUTH_CREDENTIALS, useAuthStore } from '@/shared/lib';
import { Header, Orders, SideBarMenu } from '@/widgets';

import s from './page.module.scss';

export default function Home() {
  const { isAuthenticated, isLoading, login } = useAuthStore();
  const hasTriedLogin = useRef(false);

  useEffect(() => {
    // Автоматическая авторизация при загрузке (фоном)
    if (!isAuthenticated && !isLoading && !hasTriedLogin.current) {
      hasTriedLogin.current = true;
      login(MOCK_AUTH_CREDENTIALS);
    }
  }, [isAuthenticated, isLoading, login]);

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
