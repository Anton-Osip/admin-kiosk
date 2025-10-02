import { clsx } from 'clsx';

import ArrowLeft from '@/shared/assets/arrow-left';
import KioskIcon from '@/shared/assets/kiosk-icon';
import { KiosksData, useKiosksStore } from '@/shared/lib';
import { IconContainer } from '@/shared/ui';

import s from './kiosk.module.scss';

interface Props {
  kiosk: KiosksData;
}

export const Kiosk = ({ kiosk }: Props) => {
  const { setSelectedKiosk } = useKiosksStore();

  const handleKeSelectedKiosk = () => {
    setSelectedKiosk(kiosk.id);
  };

  return (
    <div className={s.container} onClick={handleKeSelectedKiosk}>
      <IconContainer
        variant={'surface'}
        size={'lg'}
        className={s.iconContainer}
      >
        <KioskIcon className={clsx(s.icon, s[kiosk.status])} />
      </IconContainer>
      <div className={s.info}>
        <span className={s.name}>{kiosk.name}</span>
        <span className={clsx(s.status, s[kiosk.status])}>{kiosk.status}</span>
      </div>
      {kiosk.isSelected ? (
        <ArrowLeft className={s.selectedArrow} />
      ) : (
        <ArrowLeft className={s.arrow} />
      )}
    </div>
  );
};
