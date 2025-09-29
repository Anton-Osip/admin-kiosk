import { clsx } from 'clsx';

import { Button } from '@/shared';
import ArrowLeft from '@/shared/assets/arrow-left';
import { KiosksData } from '@/shared/lib/kiosks-store';
import { CodeGenerator } from '@/widgets';
import { LanguageSwitcher } from '@/widgets/language-switcher/language-switcher';

import s from './kiosk-management.module.scss';

interface Props {
  kiosk: KiosksData;
}

export const KioskManagement = ({ kiosk }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <div className={s.titleContent}>
              <h2 className={s.title}>Kiosk Management</h2>
              <p className={s.subTitle}>{kiosk.name}</p>
            </div>
            <Button variant={'ghost'} className={s.closeButton}>
              <ArrowLeft />
            </Button>
          </div>
          <div className={s.box}>
            <CodeGenerator />
            <LanguageSwitcher language={kiosk.defaultLanguage} />
          </div>
        </div>
        <footer className={s.footer}>
          <Button
            className={clsx(s.button, s.inactiveBtn)}
            variant={'secondary'}
          >
            Inactive
          </Button>
          <Button className={clsx(s.button, s.activeBtn)} variant={'secondary'}>
            Active
          </Button>
        </footer>
      </div>

      <div className={s.overlay}></div>
    </div>
  );
};
