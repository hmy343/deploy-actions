import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateConText';

export default function useBooks() {
  const { books, searchBook } = useContext(AppStateContext);
  return { books, searchBook } 
}