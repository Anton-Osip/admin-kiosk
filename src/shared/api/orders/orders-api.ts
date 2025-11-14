import { BaseResponse, instance } from '@/shared/api';

import {
  DailyCountersResponse,
  GetOrdersParams,
  MarkOrderRequest,
  OrderResponse,
  OrdersListResponse,
} from './orders-api.types';

export const ordersAPI = {
  getOrders(params?: GetOrdersParams) {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.date) queryParams.append('date', params.date);
    if (params?.kioskId) queryParams.append('kioskId', params.kioskId);
    if (params?.customerName) queryParams.append('customerName', params.customerName);
    if (params?.details) queryParams.append('details', params.details);
    if (params?.orderId) queryParams.append('orderId', params.orderId);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const queryString = queryParams.toString();
    const url = queryString ? `orders?${queryString}` : 'orders';

    return instance.get<OrdersListResponse | OrderResponse[] | BaseResponse<OrderResponse[]>>(url).then(
      (response) => {
        if (Array.isArray(response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data,
            } as BaseResponse<OrderResponse[]>,
            total: response.data.length,
          };
        }
        
        if (response.data && typeof response.data === 'object' && 'orders' in response.data) {
          const ordersList = response.data as OrdersListResponse;

          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: ordersList.orders,
            } as BaseResponse<OrderResponse[]>,
            total: ordersList.total,
          };
        }
        
        return {
          ...response,
          total: undefined,
        } as { data: BaseResponse<OrderResponse[]>; status: number; total?: number };
      },
      (error) => {
        throw error;
      }
    );
  },

  getNewOrders() {
    return instance.get<OrdersListResponse | OrderResponse[] | BaseResponse<OrderResponse[]>>('orders/new').then(
      (response) => {
        if (Array.isArray(response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data,
            } as BaseResponse<OrderResponse[]>,
          };
        }
        
        if (response.data && typeof response.data === 'object' && 'orders' in response.data) {
          const ordersList = response.data as OrdersListResponse;

          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: ordersList.orders,
            } as BaseResponse<OrderResponse[]>,
          };
        }
        
        return response as { data: BaseResponse<OrderResponse[]>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },

  getOrderById(id: string) {
    return instance.get<OrderResponse | BaseResponse<OrderResponse>>(`orders/${id}`).then(
      (response) => {
        if (!('resultCode' in response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data as OrderResponse,
            } as BaseResponse<OrderResponse>,
          };
        }

        return response as { data: BaseResponse<OrderResponse>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },

  markOrder(id: string, data: MarkOrderRequest) {
    return instance.post<OrderResponse | BaseResponse<OrderResponse>>(
      `orders/${id}/mark`,
      data
    ).then(
      (response) => {
        if (!('resultCode' in response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data as OrderResponse,
            } as BaseResponse<OrderResponse>,
          };
        }

        return response as { data: BaseResponse<OrderResponse>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },

  getDailyCounters() {
    return instance.get<DailyCountersResponse | BaseResponse<DailyCountersResponse>>(
      'orders/daily-counters'
    ).then(
      (response) => {
        if (!('resultCode' in response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data as DailyCountersResponse,
            } as BaseResponse<DailyCountersResponse>,
          };
        }

        return response as { data: BaseResponse<DailyCountersResponse>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },
};

