'use client';

import { create } from 'zustand';

interface ModalStore {
  kiosksData: KiosksData[];
  setSelectedKiosk: (kioskID: string) => void;
  clearError: (kioskId: string, errorId: string) => void;
}

export interface ErrorData {
  id: string;
  message: string;
  title: string;
}

export interface KiosksData {
  id: string;
  name: string;
  status: Status;
  isSelected: boolean;
  defaultLanguage: string;
  error?: ErrorData[];
}

type Status = 'active' | 'inactive' | 'error';

export const useKiosksStore = create<ModalStore>(set => ({
  kiosksData: [
    {
      id: 'Kiosk №1',
      name: 'Kiosk №1',
      status: 'active',
      isSelected: true,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №2',
      name: 'Kiosk №2',
      status: 'active',
      isSelected: false,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №3',
      name: 'Kiosk №3',
      status: 'inactive',
      isSelected: false,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №4',
      name: 'Kiosk №4',
      status: 'error',
      isSelected: false,
      defaultLanguage: 'english',
      error: [
        {
          id: 'error 1',
          message: 'Невозможно продолжить работу',
          title: 'Error B1',
        },
        {
          id: 'error 2',
          message: 'Невозможно продолжить работу',
          title: 'Error B2',
        },
        {
          id: 'error 3',
          message: 'Невозможно продолжить работу',
          title: 'Error B3',
        },
        {
          id: 'error 4',
          message: 'Невозможно продолжить работу',
          title: 'Error B4',
        },
      ],
    },
    {
      id: 'Kiosk №5',
      name: 'Kiosk №5',
      status: 'active',
      isSelected: false,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №6',
      name: 'Kiosk №6',
      status: 'active',
      isSelected: false,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №7',
      name: 'Kiosk №7',
      status: 'inactive',
      isSelected: false,
      defaultLanguage: 'english',
    },
    {
      id: 'Kiosk №8',
      name: 'Kiosk №8',
      status: 'error',
      isSelected: false,
      defaultLanguage: 'english',
    },
  ],

  setSelectedKiosk: (kioskId: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => ({
        ...kiosk,
        isSelected: kiosk.isSelected ? false : kiosk.id === kioskId,
      })),
    }));
  },

  clearError: (kioskId: string, errorId: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => {
        if (kiosk.id === kioskId && kiosk.error) {
          const filteredErrors = kiosk.error.filter(
            error => error.id !== errorId
          );

          return {
            ...kiosk,
            error: filteredErrors.length > 0 ? filteredErrors : undefined,
          };
        }

        return kiosk;
      }),
    }));
  },
}));
