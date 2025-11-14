import Equalizer from '@/shared/assets/equalizer';
import { useOrdersStore } from '@/shared/lib';

import s from './orders-summary.module.scss';

export const OrdersSummary = () => {
  const { dailyCounters } = useOrdersStore();

  return (
    <div className={s.container}>
      <Equalizer />
      <div className={s.content}>
        <p className={s.title}>Daily orders</p>
        <div className={s.stats}>
          <span className={s.stat}>All: {dailyCounters?.all ?? 0}</span>
          <span className={s.stat}>Printed: {dailyCounters?.printed ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
