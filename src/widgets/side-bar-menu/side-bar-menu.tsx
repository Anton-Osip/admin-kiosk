'use client';

import { useKiosksStore } from '@/shared/lib/kiosks-store';
import { DefaultLanguage } from '@/widgets/side-bar-menu/default-language/default-language';
import { KioskManagement } from '@/widgets/side-bar-menu/kiosk-management/kiosk-management';
import { MyKiosks } from '@/widgets/side-bar-menu/my-kiosks/my-kiosks';

import s from './side-bar-menu.module.scss';

export const SideBarMenu = () => {
  const {
    kiosksData,
    changeLanguage,
    setDefaultLanguageIsOpen,
    defaultLanguageIsOpen,
  } = useKiosksStore();
  const selectedKiosk = kiosksData.filter(k => k.isSelected);

  const changeLanguageHandler = (language: string) => {
    changeLanguage(selectedKiosk[0].id, language);
  };

  const toggleDefaultLanguage = () => {
    setDefaultLanguageIsOpen(!defaultLanguageIsOpen);
  };

  return (
    <div className={s.container}>
      <MyKiosks kiosks={kiosksData} />
      {!!selectedKiosk.length && (
        <KioskManagement
          kiosk={selectedKiosk[0]}
          toggleDefaultLanguage={toggleDefaultLanguage}
        />
      )}
      {!!selectedKiosk.length && defaultLanguageIsOpen && (
        <DefaultLanguage
          defaultLanguage={selectedKiosk[0].defaultLanguage}
          changeLanguage={changeLanguageHandler}
          toggleDefaultLanguage={toggleDefaultLanguage}
        />
      )}
    </div>
  );
};
