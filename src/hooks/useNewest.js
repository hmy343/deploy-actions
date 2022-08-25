import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateConText';


export default function useNewest() {
  const { handleNewest, handleHighPrice, handleLowPrice } = useContext(AppStateContext);
  return { handleNewest, handleHighPrice, handleLowPrice } 
};
