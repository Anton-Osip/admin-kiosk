import { clsx } from 'clsx';

import { Button } from '@/shared';
import ArrowLeft from '@/shared/assets/arrow-left';
import { KiosksData, useKiosksStore } from '@/shared/lib/kiosks-store';
import { CodeGenerator, ErrorBanners, LanguageSwitcher } from '@/widgets';

import s from './kiosk-management.module.scss';

interface Props {
  kiosk: KiosksData;
}

export const KioskManagement = ({ kiosk }: Props) => {
  const { setSelectedKiosk, clearError } = useKiosksStore();

  const closeKioskManagement = () => {
    setSelectedKiosk(kiosk.id);
  };

  const clearErrorHandler = (errorId: string) => {
    clearError(kiosk.id, errorId);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <div className={s.titleContent}>
              <h2 className={s.title}>Kiosk Management</h2>
              <p className={clsx(s.subTitle, s[kiosk.status])}>{kiosk.name}</p>
            </div>
            <Button
              onClick={closeKioskManagement}
              variant={'ghost'}
              className={s.closeButton}
            >
              <ArrowLeft />
            </Button>
          </div>
          <div className={s.box}>
            <CodeGenerator />
            {kiosk.status === 'error' && kiosk.error ? (
              <ErrorBanners
                errors={kiosk.error}
                clearError={clearErrorHandler}
              />
            ) : (
              <LanguageSwitcher language={kiosk.defaultLanguage} />
            )}
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
