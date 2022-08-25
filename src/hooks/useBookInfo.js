
import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateConText';

export default function useBookInfo() {
  const { bookListCounts, setBookListCounts, handleBookListCounts, handleBookPage, bookPage, setBookPage, handleNextPage } = useContext(AppStateContext);

  return { bookListCounts, setBookListCounts, handleBookListCounts, handleBookPage, bookPage, setBookPage, handleNextPage };
}
