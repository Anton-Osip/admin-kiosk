'use client';

import React from 'react';
import { create } from 'zustand';

export type ModalData =
  | {
      type: 'info-error';
      title: string;
      buttonText: string;
      onConfirm: () => void;
    }
  | {
      type: 'info-confirm';
      title: string;
      description: string;
      icon?: React.ReactNode;
      confirmButtonText: string;
      cancelButtonText?: string;
      onClose: () => void;
      onConfirm: () => void;
      buttonVariant?: 'primary' | 'secondary' | 'close';
      variant?: 'desktop' | 'mobile';
    }
  | null;

interface ModalStore {
  modalData: ModalData;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  modalData: null,

  openModal: data => {
    set({ modalData: data });
  },

  closeModal: () => {
    set({ modalData: null });
  },
}));
