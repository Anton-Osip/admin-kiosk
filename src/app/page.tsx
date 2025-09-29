'use client';

import { Header, SideBarMenu } from '@/widgets';

import s from './page.module.scss';

export default function Home() {
  return (
    <div className={s.container}>
      <SideBarMenu />
      <div className={s.content}>
        <Header />
      </div>
    </div>
  );
}
