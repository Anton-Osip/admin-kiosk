import { KiosksData } from '@/shared/lib/kiosks-store';
import { Kiosk } from '@/widgets/kiosks/kiosk/kiosk';

import s from './kiosks.module.scss';

interface Props {
  kiosks: KiosksData[];
}

export const Kiosks = ({ kiosks }: Props) => {
  const totalKiosks = kiosks.length;
  const activeKiosks = kiosks.filter(kiosk => kiosk.status !== 'error').length;

  return (
    <div className={s.kiosks}>
      <h2 className={s.title}>My Kiosks</h2>
      <h2 className={s.subTitle}>
        in work {activeKiosks} of {totalKiosks}
      </h2>
      <div className={s.container}>
        {kiosks.map(kiosk => (
          <Kiosk key={kiosk.id} kiosk={kiosk} />
        ))}
      </div>
    </div>
  );
};
