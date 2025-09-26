import { clsx } from 'clsx';

import { Button } from '@/shared';
import ArrowLeft from '@/shared/assets/arrow-left';
import Logotype from '@/shared/assets/logotype';
import { KiosksData } from '@/shared/lib/kiosks-store';
import { Kiosks } from '@/widgets/kiosks/kiosks';

import s from './my-kiosks.module.scss';

interface Props {
  kiosks: KiosksData[];
}

export const MyKiosks = ({ kiosks }: Props) => {
  return (
    <div className={s.container}>
      <header className={s.logo}>
        <Logotype width={125} height={83} />
      </header>
      <Kiosks kiosks={kiosks} />
      <footer className={s.buttons}>
        <Button className={s.button} variant={'secondary'}>
          Help
        </Button>
        <Button className={s.button} variant={'secondary'}>
          Contact
        </Button>
        <Button
          icon={<ArrowLeft />}
          variant={'secondary'}
          className={clsx(s.fullWidth, s.button)}
        >
          Back To Menu
        </Button>
      </footer>
    </div>
  );
};
