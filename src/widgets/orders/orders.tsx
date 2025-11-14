'use client';

import { clsx } from 'clsx';
import { useEffect, useMemo, useRef } from 'react';

import { useLocalStore, useOrdersStore } from '@/shared/lib';
import { DateSwitcher } from '@/shared/ui';
import { ModalOrder, OrdersForm, TableOrder } from '@/widgets';

import s from './orders.module.scss';

export const Orders = () => {
  const { activeOrdersTab, orderNumber, customerDetails } = useLocalStore();
  const ordersData = useOrdersStore(state => state.ordersData);
  const total30Days = useOrdersStore(state => state.total30Days);
  
  const selectedOrder = useMemo(() => ordersData.find(order => order.isSelected), [ordersData]);
  const hasFetchedOrders = useRef(false);
  const prevOrderNumber = useRef<number | undefined>(undefined);
  const prevCustomerDetails = useRef<string | undefined>(undefined);
  const prevActiveTab = useRef<'all' | 'new'>(activeOrdersTab);
  const hasFetchedDailyCounters = useRef(false);
  const isFetchingRef = useRef(false);
  const lastFetchParamsRef = useRef<string>('');

  useEffect(() => {
    const tabChanged = prevActiveTab.current !== activeOrdersTab;
    const orderNumberChanged = prevOrderNumber.current !== orderNumber;
    const customerDetailsChanged = prevCustomerDetails.current !== customerDetails;

    if (!tabChanged && !orderNumberChanged && !customerDetailsChanged && hasFetchedOrders.current) {
      return;
    }

    if (isFetchingRef.current) {
      return;
    }

    const fetchParams = `${activeOrdersTab}-${orderNumber || ''}-${customerDetails || ''}`;
    if (lastFetchParamsRef.current === fetchParams && hasFetchedOrders.current) {
      return;
    }

    prevActiveTab.current = activeOrdersTab;
    prevOrderNumber.current = orderNumber;
    prevCustomerDetails.current = customerDetails;
    lastFetchParamsRef.current = fetchParams;
    isFetchingRef.current = true;

    if (tabChanged) {
      hasFetchedOrders.current = false;
    }

    const fetchData = async () => {
      const store = useOrdersStore.getState();
      
      try {
        if (activeOrdersTab === 'new') {
          const currentFilters = store.filters;
          if (currentFilters.orderId || currentFilters.customerDetails) {
            store.setFilters({
              ...currentFilters,
              orderId: undefined,
              customerDetails: undefined,
            });
          }
          await store.fetchNewOrders();
        } else {
          if (orderNumber || customerDetails) {
            const currentOrdersData = store.ordersData;
            const orderId = orderNumber 
              ? currentOrdersData.find(o => o.number === orderNumber)?.id 
              : undefined;
            
            const newFilters = {
              orderId: orderId || undefined,
              customerDetails: customerDetails || undefined,
            };
            
            const currentFilters = store.filters;
            if (
              currentFilters.orderId !== newFilters.orderId ||
              currentFilters.customerDetails !== newFilters.customerDetails
            ) {
              store.setFilters({
                ...currentFilters,
                ...newFilters,
              });
            }
            await store.applyFilters();
          } else {
            const currentFilters = store.filters;
            if (currentFilters.orderId || currentFilters.customerDetails) {
              store.setFilters({
                ...currentFilters,
                orderId: undefined,
                customerDetails: undefined,
              });
              await store.applyFilters();
            } else {
              await store.fetchOrders();
            }
          }
        }
        
        if (!hasFetchedDailyCounters.current || tabChanged) {
          await store.fetchDailyCounters();
          hasFetchedDailyCounters.current = true;
        }
      } finally {
        isFetchingRef.current = false;
        hasFetchedOrders.current = true;
      }
    };

    fetchData();
  }, [activeOrdersTab, orderNumber, customerDetails]);

  return (
    <div className={s.container}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>
          {activeOrdersTab === 'new' ? 'New Orders' : 'All Orders'}
        </h1>
        {activeOrdersTab === 'all' && total30Days !== null && (
          <span className={s.subtitle}>
            <span>In 30 day - </span>{total30Days}
          </span>
        )}
      </div>
      {activeOrdersTab === 'all' && <OrdersForm />}
      <TableOrder
        tableBodyClassName={clsx(
          activeOrdersTab === 'all' ? s.tableBodyAll : s.tableBody
        )}
        className={clsx(
          activeOrdersTab === 'all' ? s.tableSpace70 : s.tableSpace50
        )}
      />
      {activeOrdersTab === 'all' && (
        <DateSwitcher className={s.dateSwitcherWrapper} />
      )}
      {selectedOrder && <ModalOrder order={selectedOrder} />}
    </div>
  );
};
