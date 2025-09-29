'use client';

import { Tabs } from '@/shared';
import { OrdersTab, useLocalStore } from '@/shared/lib/local-store';

import s from './header.module.scss';

const item = [
  {
    name: 'new',
    title: 'New Orders',
  },
  {
    name: 'all',
    title: 'All Orders',
  },
];

export function Header() {
  const { activeOrdersTab, changeOrdersTab } = useLocalStore();

  const changeOrdersTabHandler = (value: string) => {
    changeOrdersTab(value as OrdersTab);
  };

  return (
    <header className={s.header}>
      <Tabs
        className={s.tabs}
        items={item}
        defaultItem={activeOrdersTab}
        changeTabs={changeOrdersTabHandler}
      />
    </header>
  );
}
