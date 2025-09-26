'use client';

import { create } from 'zustand';

interface ModalStore {
  kiosksData: KiosksData[];
  setSelectedKiosk: (kioskID: string) => void;
}

export interface KiosksData {
  id: string;
  name: string;
  status: Status;
  isSelected: boolean;
}

type Status = 'active' | 'inactive' | 'error';

export const useKiosksStore = create<ModalStore>(set => ({
  kiosksData: [
    { id: 'Kiosk №1', name: 'Kiosk №1', status: 'active', isSelected: true },
    {
      id: 'Kiosk №2',
      name: 'Kiosk №2',
      status: 'active',
      isSelected: false,
    },
    { id: 'Kiosk №3', name: 'Kiosk №3', status: 'inactive', isSelected: false },
    { id: 'Kiosk №4', name: 'Kiosk №4', status: 'error', isSelected: false },
    { id: 'Kiosk №5', name: 'Kiosk №5', status: 'active', isSelected: false },
    {
      id: 'Kiosk №6',
      name: 'Kiosk №6',
      status: 'active',
      isSelected: false,
    },
    { id: 'Kiosk №7', name: 'Kiosk №7', status: 'inactive', isSelected: false },
    { id: 'Kiosk №8', name: 'Kiosk №8', status: 'error', isSelected: false },
  ],

  setSelectedKiosk: (kioskId: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => ({
        ...kiosk,
        isSelected: kiosk.isSelected ? false : kiosk.id === kioskId,
      })),
    }));
  },
}));
