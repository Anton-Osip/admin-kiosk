import { useLocalStore } from '@/shared/lib/local-store';
import { OrdersForm } from '@/widgets';

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
    </div>
  );
};
