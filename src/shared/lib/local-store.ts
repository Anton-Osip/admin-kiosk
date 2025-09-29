import { create } from 'zustand';

export type OrdersTab = 'all' | 'new';

export interface LocalStore {
  activeOrdersTab: OrdersTab;
  changeOrdersTab: (values: OrdersTab) => void;
  orderNumber: number | undefined;
  changeOrderNumber: (value: number | undefined) => void;
  customerDetails: string | undefined;
  changeCustomerDetails: (value: string | undefined) => void;
}

export const useLocalStore = create<LocalStore>(set => ({
  activeOrdersTab: 'all',
  orderNumber: undefined,
  customerDetails: undefined,

  changeOrdersTab: values => {
    set({ activeOrdersTab: values });
  },
  changeOrderNumber: (value: number | undefined) => {
    set({ orderNumber: value });
  },
  changeCustomerDetails: (value: string | undefined) => {
    set({ customerDetails: value });
  },
}));
