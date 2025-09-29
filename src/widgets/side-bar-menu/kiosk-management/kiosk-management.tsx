import { clsx } from 'clsx';

import { Button } from '@/shared';
import ArrowLeft from '@/shared/assets/arrow-left';
import { KiosksData, Status, useKiosksStore } from '@/shared/lib/kiosks-store';
import { CodeGenerator, ErrorBanners, LanguageSwitcher } from '@/widgets';

import s from './kiosk-management.module.scss';

interface Props {
  kiosk: KiosksData;
  toggleDefaultLanguage: () => void;
}

export const KioskManagement = ({ kiosk, toggleDefaultLanguage }: Props) => {
  const { setSelectedKiosk, clearError, changeStatus } = useKiosksStore();

  const closeKioskManagement = () => {
    setSelectedKiosk(kiosk.id);
  };

  const clearErrorHandler = (errorId: string) => {
    clearError(kiosk.id, errorId);
  };
  const changeStatusHandler = (status: Status) => {
    changeStatus(kiosk.id, status);
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
              <LanguageSwitcher
                language={kiosk.defaultLanguage}
                toggleDefaultLanguage={toggleDefaultLanguage}
              />
            )}
          </div>
        </div>
        <footer className={s.footer}>
          <Button
            className={clsx(
              s.button,
              kiosk.status === 'inactive' ? s.activeBtn : s.inactiveBtn
            )}
            variant={'secondary'}
            onClick={() => changeStatusHandler('inactive')}
          >
            Inactive
          </Button>
          <Button
            className={clsx(
              s.button,
              kiosk.status === 'active' ? s.activeBtn : s.inactiveBtn
            )}
            variant={'secondary'}
            onClick={() => changeStatusHandler('active')}
          >
            Active
          </Button>
        </footer>
      </div>

      <div className={s.overlay}></div>
    </div>
  );
};
