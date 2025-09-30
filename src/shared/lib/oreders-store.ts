'use client';

import { StaticImageData } from 'next/image';
import { create } from 'zustand';

import image from '../../../public/orderImage.png';

interface OrdersData {
  number: number;
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  kioskNumber: number;
  status: 'not printed' | 'printed';
  imageURL: StaticImageData;
}

interface OrdersStore {
  ordersData: OrdersData[];
}

export const useKiosksStore = create<OrdersStore>(() => ({
  ordersData: [
    {
      number: 430,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 429,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'printed',
      imageURL: image,
    },
    {
      number: 428,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 427,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 426,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'printed',
      imageURL: image,
    },
    {
      number: 425,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 424,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 423,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 422,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 421,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 420,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'printed',
      imageURL: image,
    },
    {
      number: 419,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 418,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 417,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
    {
      number: 416,
      name: 'Michael',
      phoneNumber: '1-212-555-7575',
      date: '03.10.2025',
      time: '20:30',
      kioskNumber: 1,
      status: 'not printed',
      imageURL: image,
    },
  ],
}));
