import Equalizer from '@/shared/assets/equalizer';

import s from './orders-summary.module.scss';

export const OrdersSummary = () => {
  return (
    <div className={s.container}>
      <Equalizer />
      <div className={s.content}>
        <p className={s.title}>Daily orders</p>
        <div className={s.stats}>
          <span className={s.stat}>All: 12</span>
          <span className={s.stat}>Printed: 8</span>
        </div>
      </div>
    </div>
  );
};
