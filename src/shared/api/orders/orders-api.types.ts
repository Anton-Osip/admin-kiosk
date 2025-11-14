export type OrderStatus = 'printed' | 'not_printed';

export interface KioskInfo {
  id: string;
  name: string;
}

export interface OrderResponse {
  id: string; // uuid
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string; // "Not Printed" или "Printed" от бэкенда
  imageUrl: string;
  printedAt: string | null; // ISO date или null
  kioskNumber?: string; // номер киоска от бэкенда
  kioskId?: string; // id киоска от бэкенда
  kiosk?: KioskInfo; // объект киоска (если есть)
  createdAt: string; // ISO date
}

export interface OrdersListResponse {
  orders: OrderResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface DailyCountersResponse {
  all: number;
  printed: number;
}

export interface GetOrdersParams {
  status?: OrderStatus;
  date?: string; // ISO date или формат даты
  kioskId?: string;
  customerName?: string;
  details?: string; // Email или телефон
  orderId?: string; // UUID заказа
  limit?: number;
  offset?: number;
}

export interface MarkOrderRequest {
  status: OrderStatus;
}

