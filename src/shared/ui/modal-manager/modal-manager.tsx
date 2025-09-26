'use client';

import React from 'react';

import { useModalStore } from '@/shared/lib/modal-store';
import { InfoErrorModal } from '@/shared/ui/info-error-modal/info-error-modal';
import { InfoModal } from '@/shared/ui/info-modal/info-modal';

export function ModalManager() {
  const { modalData, closeModal } = useModalStore();

  if (!modalData) return null;

  switch (modalData.type) {
    case 'info-error':
      return (
        <InfoErrorModal
          isOpen={true}
          onCloseAction={closeModal}
          onConfirm={modalData.onConfirm}
          title={modalData.title}
          buttonText={modalData.buttonText}
        />
      );

    case 'info-confirm':
      return (
        <InfoModal
          isOpen={true}
          onClose={closeModal}
          title={modalData.title}
          description={modalData.description}
          icon={modalData.icon}
          cancelButtonText={modalData.cancelButtonText}
          confirmButtonText={modalData.confirmButtonText}
          onConfirm={modalData.onConfirm}
          mainButtonVariant={modalData.buttonVariant}
          variant={modalData.variant}
        />
      );

    default:
      return null;
  }
}
