import { useKiosksStore } from '@/shared/lib/kiosks-store';
import { KioskManagement } from '@/widgets/side-bar-menu/kiosk-management/kiosk-management';
import { MyKiosks } from '@/widgets/side-bar-menu/my-kiosks/my-kiosks';

import s from './side-bar-menu.module.scss';

export const SideBarMenu = () => {
  const { kiosksData } = useKiosksStore();
  const selectedKiosk = kiosksData.filter(k => k.isSelected);

  return (
    <div className={s.container}>
      <MyKiosks kiosks={kiosksData} />
      {!!selectedKiosk.length && <KioskManagement kiosk={selectedKiosk[0]} />}
    </div>
  );
};
