'use client';

import { Input, Tabs } from '@/shared';
import { OrdersTab, useLocalStore } from '@/shared/lib/local-store';
import { OrdersSummary } from '@/widgets';

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
  const {
    activeOrdersTab,
    changeOrdersTab,
    changeOrderNumber,
    changeCustomerDetails,
  } = useLocalStore();

  const changeOrdersTabHandler = (value: string) => {
    changeOrdersTab(value as OrdersTab);
  };

  const changeOrdersNumberHandler = (value: string) => {
    changeOrderNumber(Number(value));
  };

  const changeCustomerDetailsHandler = (value: string) => {
    changeCustomerDetails(value);
  };

  return (
    <header className={s.header}>
      <div className={s.controls}>
        <Tabs
          className={s.tabs}
          items={item}
          defaultItem={activeOrdersTab}
          changeTabs={changeOrdersTabHandler}
        />
        <Input
          className={s.input}
          type="number"
          showImageButton={true}
          placeholder={'Input Order Number'}
          sendInput={changeOrdersNumberHandler}
        />
        <Input
          className={s.input}
          showImageButton={true}
          placeholder={'Enter Customer Details'}
          sendInput={changeCustomerDetailsHandler}
        />
      </div>
      <OrdersSummary />
    </header>
  );
}
