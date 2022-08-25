import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateConText';

// orders 데이터를 받아서 내주는 역할을 하는 Hook
export default function useOrders() {
  const { orders } = useContext(AppStateContext);
  return orders;
};



