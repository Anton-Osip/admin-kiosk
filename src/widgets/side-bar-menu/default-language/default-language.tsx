import { clsx } from 'clsx';

import { Button } from '@/shared';
import ArrowLeft from '@/shared/assets/arrow-left';
import CheckIcon from '@/shared/assets/check-icon';

import s from './default-language.module.scss';

interface Props {
  defaultLanguage: string;
  changeLanguage: (language: string) => void;
  toggleDefaultLanguage: () => void;
}

const languages = ['english', 'french', 'spanish', 'japanese'];

export const DefaultLanguage = ({
  defaultLanguage,
  changeLanguage,
  toggleDefaultLanguage,
}: Props) => {
  return (
    <div className={s.container}>
      <div className={s.titleContent}>
        <h2 className={s.title}>Default language</h2>{' '}
        <Button
          onClick={toggleDefaultLanguage}
          variant={'ghost'}
          className={s.closeButton}
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className={s.content}>
        {languages.map((language, i) => (
          <div
            key={`language${i}`}
            className={clsx(
              s.language,
              defaultLanguage === language && s.currentLanguage
            )}
            onClick={() => changeLanguage(language)}
          >
            <span className={s.text}>{language}</span>
            {defaultLanguage === language && <CheckIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};
