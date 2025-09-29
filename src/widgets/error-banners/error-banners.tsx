import { Button } from '@/shared';
import ErrorIcon from '@/shared/assets/error-icon';
import { ErrorData } from '@/shared/lib/kiosks-store';

import s from './error-banners.module.scss';

interface Props {
  errors: ErrorData[];
  clearError: (errorId: string) => void;
}

export const ErrorBanners = ({ errors, clearError }: Props) => {
  return (
    <div className={s.wrapper}>
      {errors.map((error, i) => {
        if (i > 2) return null;

        return (
          <div className={s.container} key={error.id}>
            <div className={s.errorInfo}>
              <div className={s.title}>
                <ErrorIcon />
                <span>{error.title}</span>
              </div>
              <p className={s.message}>{error.message}</p>
            </div>
            <Button
              variant={'light'}
              className={s.clearButton}
              onClick={() => clearError(error.id)}
            >
              Clear error
            </Button>
          </div>
        );
      })}
    </div>
  );
};
