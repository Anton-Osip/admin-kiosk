'use client';

import { useState } from 'react';

import { useKiosksStore, useOrdersStore } from '@/shared/lib';
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

export const OrdersForm = () => {
  const { filters, setFilters, applyFilters } = useOrdersStore();
  const { kiosksData } = useKiosksStore();
  const [customerName, setCustomerName] = useState(filters.customerName || '');
  const [customerDetails, setCustomerDetails] = useState(filters.customerDetails || '');
  const [status, setStatus] = useState(filters.status || '');
  const [date, setDate] = useState(filters.date || '');
  const [kioskId, setKioskId] = useState(filters.kioskId || '');

  const kiosksSelect = kiosksData.map(kiosk => {
    const kioskNumberMatch = kiosk.name.match(/\d+/);
    const kioskNumber = kioskNumberMatch ? kioskNumberMatch[0] : kiosk.id;

    return {
      value: kiosk.id,
      label: kioskNumber,
    };
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFilters({
      customerName: customerName.trim() || undefined,
      customerDetails: customerDetails.trim() || undefined,
      status: status || undefined,
      date: date || undefined,
      kioskId: kioskId || undefined,
    });
    
    await applyFilters();
  };

  return (
    <form className={s.container} onSubmit={handleSearch}>
      <Input 
        placeholder={'Name'} 
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <Input 
        placeholder={'Customer Details'} 
        value={customerDetails}
        onChange={(e) => setCustomerDetails(e.target.value)}
      />
      <Select 
        placeholder={'Status'} 
        options={statusSelect} 
        allowClear={true}
        value={status}
        onChange={(value) => setStatus(value)}
      />
      <Input 
        type="date" 
        placeholder={'Date'}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Select
        placeholder={'Kiosk number'}
        options={kiosksSelect}
        allowClear={true}
        value={kioskId}
        onChange={(value) => setKioskId(value)}
      />
      <Button type="submit" size={'lg'} className={s.submitBtn}>
        Search
      </Button>
    </form>
  );
};
