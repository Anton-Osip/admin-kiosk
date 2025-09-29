import ArrowLeft from '@/shared/assets/arrow-left';

import s from './language-switcher.module.scss';

interface Props {
  language: string;
}

export const LanguageSwitcher = ({ language }: Props) => {
  return (
    <div className={s.container}>
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
