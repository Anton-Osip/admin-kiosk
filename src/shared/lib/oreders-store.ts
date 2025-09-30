'use client';

import { StaticImageData } from 'next/image';
import { create } from 'zustand';

import image from '../../../public/orderImage.png';

export interface OrdersData {
  number: number;
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  kioskNumber: number;
  status: 'not printed' | 'printed';
  imageURL: StaticImageData;
  isSelected: boolean;
  email: string;
}

interface OrdersStore {
  ordersData: OrdersData[];
  setSelected: (id: number) => void;
}

export const useOrdersStore = create<OrdersStore>(set => ({
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
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
      isSelected: false,
      email: 'qweqw@gmail.com',
    },
  ],
  setSelected: id => {
    set(state => ({
      ordersData: state.ordersData.map(o => ({
        ...o,
        isSelected: o.isSelected ? false : o.number === id,
      })),
    }));
  },
}));
