import { clsx } from 'clsx';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared';
import { useOrdersStore } from '@/shared/lib/oreders-store';

import s from './table-order.module.scss';

interface Props {
  className?: string;
  tableBodyClassName?: string;
}

export const TableOrder = ({ className, tableBodyClassName }: Props) => {
  const { ordersData, setSelected } = useOrdersStore();
  const setSelectedHandler = (id: number) => {
    setSelected(id);
  };

  return (
    <Table className={clsx(className ?? className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead className={s.emptyCeil}></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Kiosk number</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className={clsx(tableBodyClassName ?? tableBodyClassName)}>
        {ordersData.map(o => (
          <TableRow key={o.number} onClick={() => setSelectedHandler(o.number)}>
            <TableCell>
              <span className={s.symbol}>№</span> {o.number}
            </TableCell>
            <TableCell className={s.imageCeil}>
              <Image src={o.imageURL} alt={'image'} width={60} height={60} />
            </TableCell>
            <TableCell>{o.name}</TableCell>
            <TableCell>{o.phoneNumber}</TableCell>
            <TableCell>{o.date}</TableCell>
            <TableCell>{o.time}</TableCell>
            <TableCell>{o.kioskNumber}</TableCell>
            <TableCell>
              {o.status === 'printed' ? 'Printed' : 'Not Printed'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
