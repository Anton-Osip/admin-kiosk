import { create } from 'zustand';

export type OrdersTab = 'all' | 'new';

export interface LocalStore {
  activeOrdersTab: OrdersTab;

  changeOrdersTab: (values: OrdersTab) => void;
}

export const useLocalStore = create<LocalStore>(set => ({
  activeOrdersTab: 'all',

  changeOrdersTab: values => {
    set({ activeOrdersTab: values });
  },
}));
