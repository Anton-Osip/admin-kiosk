import { clsx } from 'clsx';

import { DateSwitcher } from '@/shared';
import { useLocalStore } from '@/shared/lib/local-store';
import { OrdersForm, TableOrder } from '@/widgets';

import s from './orders.module.scss';

export const Orders = () => {
  const { activeOrdersTab } = useLocalStore();

  return (
    <div className={s.container}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>
          {activeOrdersTab === 'new' ? 'New Orders' : 'All Orders'}
        </h1>
        {activeOrdersTab === 'all' && (
          <span className={s.subtitle}>
            <span>In 30 day - </span>1 430
          </span>
        )}
      </div>
      {activeOrdersTab === 'all' && <OrdersForm />}
      <TableOrder
        tableBodyClassName={clsx(
          activeOrdersTab === 'all' ? s.tableBodyAll : s.tableBody
        )}
        className={clsx(
          activeOrdersTab === 'all' ? s.tableSpace70 : s.tableSpace50
        )}
      />
      {activeOrdersTab === 'all' && (
        <DateSwitcher className={s.dateSwitcherWrapper} />
      )}
    </div>
  );
};
