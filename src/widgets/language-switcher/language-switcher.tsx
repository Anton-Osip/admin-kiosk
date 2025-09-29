import ArrowLeft from '@/shared/assets/arrow-left';

import s from './language-switcher.module.scss';

interface Props {
  language: string;
  toggleDefaultLanguage: () => void;
}

export const LanguageSwitcher = ({
  language,
  toggleDefaultLanguage,
}: Props) => {
  return (
    <div className={s.container} onClick={toggleDefaultLanguage}>
      <div className={s.info}>
        <p className={s.title}>Default language</p>
        <p className={s.language}>{language}</p>
      </div>
      <div className={s.arrow}>
        <ArrowLeft />
      </div>
    </div>
  );
};
