import { Button, Input, Select } from '@/shared/ui';

import s from './orders-form.module.scss';

const statusSelect = [
  {
    value: 'Not Printed',
    label: 'Not Printed',
  },
  {
    value: 'Printed',
    label: 'Printed',
  },
];

const kiosksSelect = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
];

export const OrdersForm = () => {
  return (
    <form className={s.container}>
      <Input placeholder={'Name'} />
      <Input placeholder={'Customer Details'} />
      <Select placeholder={'Status'} options={statusSelect} allowClear={true} />
      <Input type="date" placeholder={'Date'} />
      <Select
        placeholder={'Kiosk number'}
        options={kiosksSelect}
        allowClear={true}
      />
      <Button size={'lg'} className={s.submitBtn}>
        Search
      </Button>
    </form>
  );
};
