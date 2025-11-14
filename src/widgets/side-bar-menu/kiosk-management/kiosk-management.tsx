import { clsx } from 'clsx';

import ArrowLeft from '@/shared/assets/arrow-left';
import { KiosksData, Status, useKiosksStore } from '@/shared/lib';
import { Button, Tabs } from '@/shared/ui';
import { CodeGenerator, ErrorBanners, LanguageSwitcher } from '@/widgets';

import s from './kiosk-management.module.scss';

interface Props {
  kiosk: KiosksData;
  toggleDefaultLanguage: () => void;
}

const tabsItem = [
  { name: 'inactive', title: 'Inactive' },
  { name: 'active', title: 'Active' },
];

export const KioskManagement = ({ kiosk, toggleDefaultLanguage }: Props) => {
  const { setSelectedKiosk, clearError, updateKioskStatus } = useKiosksStore();

  const closeKioskManagement = () => {
    setSelectedKiosk(kiosk.id);
  };

  const clearErrorHandler = (errorId: string) => {
    clearError(kiosk.id, errorId);
  };
  const changeStatusHandler = (value: string) => {
    updateKioskStatus(kiosk.id, value as Status);
  };

  const closeAll = () => {
    closeKioskManagement();
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
        <Tabs
          className={s.tabs}
          items={tabsItem}
          defaultItem={kiosk.status === 'error' ? 'inactive' : kiosk.status}
          changeTabs={changeStatusHandler}
        />
      </div>

      <div className={s.overlay} onClick={closeAll}></div>
    </div>
  );
};
