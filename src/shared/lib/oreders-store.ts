'use client';

import { create } from 'zustand';

import { OrderResponse,ordersAPI } from '@/shared/api/orders';

import image from '../../../public/orderImage.png';

export interface OrdersData {
  id: string;
  number: number;
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  kioskNumber: number;
  status: 'not printed' | 'printed';
  imageURL: string | typeof image;
  isSelected: boolean;
  email: string;
}

interface OrdersStore {
  ordersData: OrdersData[];
  isLoading: boolean;
  dailyCounters: { all: number; printed: number } | null;
  total30Days: number | null;
  filters: {
    customerName?: string;
    customerDetails?: string;
    status?: string;
    date?: string;
    kioskId?: string;
    orderId?: string;
  };
  setFilters: (filters: {
    customerName?: string;
    customerDetails?: string;
    status?: string;
    date?: string;
    kioskId?: string;
    orderId?: string;
  }) => void;
  applyFilters: () => Promise<void>;
  setSelected: (id: number) => void;
  fetchOrders: (params?: {
    status?: 'printed' | 'not_printed';
    date?: string;
    kioskId?: string;
    customerName?: string;
    details?: string;
    orderId?: string;
  }) => Promise<void>;
  fetchNewOrders: () => Promise<void>;
  markOrderAsPrinted: (orderId: string, status: 'printed' | 'not_printed') => Promise<void>;
  fetchDailyCounters: () => Promise<void>;
}

const mapOrderResponseToOrdersData = (
  order: OrderResponse,
  index: number,
  existingOrder?: OrdersData
): OrdersData => {
  const createdAt = new Date(order.createdAt);
  const dateStr = createdAt.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = createdAt.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  let kioskNumber = 0;
  if (order.kioskNumber) {
    const kioskNumberMatch = order.kioskNumber.match(/\d+/);
    kioskNumber = kioskNumberMatch ? parseInt(kioskNumberMatch[0], 10) : 0;
  } else if (order.kiosk?.name) {
    const kioskNumberMatch = order.kiosk.name.match(/\d+/);
    kioskNumber = kioskNumberMatch ? parseInt(kioskNumberMatch[0], 10) : 0;
  }

  const numberFromId = parseInt(order.id.replace(/-/g, '').substring(0, 8), 16) % 10000;
  const orderNumber = numberFromId || (1000 - index);

  const status = order.status.toLowerCase() === 'printed' ? 'printed' : 'not printed';

  return {
    id: order.id,
    number: orderNumber,
    name: order.customerName,
    phoneNumber: order.customerPhone,
    date: dateStr.replace(/\//g, '.'),
    time: timeStr,
    kioskNumber,
    status,
    imageURL: order.imageUrl || image,
    isSelected: existingOrder?.isSelected ?? false,
    email: order.customerEmail,
  };
};

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  ordersData: [],
  isLoading: false,
  dailyCounters: null,
  total30Days: null,
  filters: {},

  setFilters: (filters) => {
    set({ filters });
  },

  applyFilters: async () => {
    const { filters } = get();
    const statusMap: Record<string, 'printed' | 'not_printed'> = {
      'Printed': 'printed',
      'Not Printed': 'not_printed',
    };
    
    let status: 'printed' | 'not_printed' | undefined = undefined;
    if (filters.status) {
      if (filters.status in statusMap) {
        status = statusMap[filters.status];
      } else if (filters.status === 'printed' || filters.status === 'not_printed') {
        status = filters.status;
      }
    }
    
    await get().fetchOrders({
      customerName: filters.customerName,
      details: filters.customerDetails,
      status,
      date: filters.date,
      kioskId: filters.kioskId,
      orderId: filters.orderId,
    });
  },

  setSelected: id => {
    set(state => ({
      ordersData: state.ordersData.map(o => ({
        ...o,
        isSelected: o.isSelected ? false : o.number === id,
      })),
    }));
  },

  fetchOrders: async (params) => {
    try {
      set({ isLoading: true, ordersData: [] });
      const response = await ordersAPI.getOrders({
        status: params?.status,
        date: params?.date,
        kioskId: params?.kioskId,
        customerName: params?.customerName,
        details: params?.details,
        orderId: params?.orderId,
      });
      const orders = response.data?.data || [];
      const total = (response as { total?: number }).total;

      const currentOrders = get().ordersData;
      const mappedOrders = orders.map((order, index) => {
        const existingOrder = currentOrders.find(o => o.id === order.id);

        return mapOrderResponseToOrdersData(order, index, existingOrder);
      });

      set({ 
        ordersData: mappedOrders, 
        isLoading: false,
        total30Days: total !== undefined ? total : null,
      });
    } catch (error) {
      console.error('[OrdersStore] Ошибка загрузки заказов:', error);
      set({ isLoading: false });
    }
  },

  fetchNewOrders: async () => {
    try {
      set({ isLoading: true, ordersData: [] });
      const response = await ordersAPI.getNewOrders();
      const orders = response.data?.data || [];

      const currentOrders = get().ordersData;
      const mappedOrders = orders.map((order, index) => {
        const existingOrder = currentOrders.find(o => o.id === order.id);

        return mapOrderResponseToOrdersData(order, index, existingOrder);
      });

      set({ ordersData: mappedOrders, isLoading: false });
    } catch (error) {
      console.error('[OrdersStore] Ошибка загрузки новых заказов:', error);
      set({ isLoading: false });
    }
  },

  markOrderAsPrinted: async (orderId: string, status: 'printed' | 'not_printed') => {
    const mappedStatus: 'printed' | 'not printed' = status === 'not_printed' ? 'not printed' : 'printed';
    
    set(state => ({
      ordersData: state.ordersData.map(order => {
        if (order.id === orderId) {
          return { ...order, status: mappedStatus };
        }

        return order;
      }),
    }));

    try {
      const response = await ordersAPI.markOrder(orderId, { status });
      const updatedOrder = response.data?.data;

      if (updatedOrder) {
        set(state => {
          const existingOrder = state.ordersData.find(o => o.id === orderId);
          const mappedOrder = mapOrderResponseToOrdersData(updatedOrder, 0, existingOrder);

          return {
            ordersData: state.ordersData.map(order => {
              if (order.id === orderId) {
                return mappedOrder;
              }

              return order;
            }),
          };
        });
      }

      await get().fetchDailyCounters();
    } catch {
      // ignore
    }
  },

  fetchDailyCounters: async () => {
    try {
      const response = await ordersAPI.getDailyCounters();
      const counters = response.data?.data;

      if (counters && typeof counters === 'object' && 'all' in counters && 'printed' in counters) {
        set({ dailyCounters: { all: counters.all, printed: counters.printed } });
      }
    } catch {
      // ignore
    }
  },
}));
