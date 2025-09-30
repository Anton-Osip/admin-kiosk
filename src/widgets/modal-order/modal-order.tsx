import { clsx } from 'clsx';
import Image from 'next/image';

import { Button, Modal } from '@/shared';
import PrintIcon from '@/shared/assets/print-icon';
import { OrdersData, useOrdersStore } from '@/shared/lib/oreders-store';

import image from '../../../public/img.png';
import s from './modal-order.module.scss';

interface Props {
  order: OrdersData;
}

export const ModalOrder = ({ order }: Props) => {
  const { setSelected } = useOrdersStore();
  const setSelectedHandler = () => {
    setSelected(order.number);
  };

  return (
    <Modal
      overlayClassName={s.overlay}
      isOpen={!!order}
      onClose={setSelectedHandler}
      showCloseButton={false}
    >
      <div className={s.wrapper}>
        <div className={s.container}>
          <div className={s.item}>
            <p className={s.title}>Order</p>
            <p className={clsx(s.value, s.primary)}>№ {order.number}</p>
          </div>
          <div className={s.item}>
            <p className={s.title}>Date</p>
            <p className={s.value}>{order.date}</p>
          </div>
          <div className={s.item}>
            <p className={s.title}>Time</p>
            <p className={s.value}>{order.time}</p>
          </div>
          <div className={s.item}>
            <p className={s.title}>Status</p>
            <p className={s.value}>
              {order.status === 'printed' ? 'Printed' : 'Not Printed'}
            </p>
          </div>
          <div className={s.item}>
            <p className={s.title}>Name</p>
            <p className={s.value}>{order.name}</p>
          </div>
          <div className={s.item}>
            <p className={s.title}>E-mail</p>
            <p className={s.value}>{order.email}</p>
          </div>
        </div>
        <div className={s.imageBox}>
          <Image src={image} alt={'image'} width={476} height={476} />
        </div>
        <div className={s.container}>
          <Button
            variant="close"
            size="lg"
            className={s.closeBtn}
            onClick={setSelectedHandler}
          >
            Not Printed
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <div className={s.print}>
            <PrintIcon />
          </div>
          <Button variant="primary" size="lg" className={s.printedBtn}>
            Printed
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
