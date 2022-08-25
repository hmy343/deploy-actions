import { computeHeadingLevel } from '@testing-library/react';
import React, { useCallback, useEffect, useState, useRef, useReducer } from 'react';
import { bookSearch } from '../api/API_KEY';
import ScrollTop from '../components/ScrollTop';
import AppStateContext from '../contexts/AppStateConText';
import Library from '../components/Library';

const AppStateProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const [bookPage, setBookPage] = useState(1);

  // 한 페이지에 보여질 문서의 개수 : 9개 (초기값)
  const [bookListCounts, setBookListCounts] = useState(9);

  // API 호출이 검색어를 통해 이루어짐-> 검색어 값이 있는 경우 실행
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
    } else {
      // 초기값 세팅을 위함
      bookSearchHttpHandler("리액트", true);
    }
  }, [query, bookListCounts, bookPage]);

  // book searcch 핸들러
  const bookSearchHttpHandler = async (query, reset, page = bookPage) => {
    // paramter 설정
    
    const params = {
      query: query, //검색어
      sort: 'accuracy', // accuracy | recency 정확도 or 최신
      page: page, // 페이지번호
      size: bookListCounts, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출
    // 리스트를 초기화한 후에 다시 랜더링할 것인가를 의미
    if (reset) {
      setBooks(data);
    } else {
      // 검색 된 값들 출력
      setBooks(books.documents.concat(data.documents));
    }
  };
  // 검색 후 첫번째 페이지에 검색어 유지
  const searchBook = (text) => {
    setQuery(text);
    setBookPage(1);
  };
  // 장바구니 
  const [orders, setOrders] = useState([]);
  // 장바구니 추가
  // orders의 orderBook : 책의 정보, quantity: 해당 책의 갯수
  // useCallback으로 받아오는 book : 선택된 책의 정보
  const addToOrder = useCallback((book) => {
    setOrders((orders) => {
      // 동일한 책을 추가할 땐 2권, 3권 으로 변경해주기 위해 동일한 isbn가 있는지 검사
      const finded = orders.find((order) => order.orderBook.isbn === book.isbn);
      // 장바구니에 동일한 책이 없으면 quantity에 1을 넣어줌
      if (finded === undefined) {
        return [...orders, { orderBook: book, quantity: 1 }];
      } // 동일한 책이 있으면
      else {
        return orders.map((order) => {
          // 동일한 책을 찾아 quantity 값을 증가 시켜주기위함.
          if (order.orderBook.isbn === book.isbn) {
            return {
              orderBook: book,
              quantity: order.quantity + 1, // 동일한 책 추가로 장바구니 담을 시 quantity 1씩 증가
            };
          } else {
            return order;
          }
        });
      }
    });
  }, [orders]);

  // 장바구니에서 책 삭제하기
  const remove = useCallback((isbn) => {
    setOrders((orders) => {
      return orders.filter((order) => order.orderBook.isbn !== isbn);
    });
  }, [orders]);

  // 장바구니에서 전체 책 삭제하기
  const removeAll = useCallback(() => {
    setOrders([]);
  }, [orders]);


  // [ 최신순 & 가격순 관리 ]
  // 정렬시 검색된 정보가 담긴 페이지 정보(meta)가져오기
  const metaPage = books.meta;
  // 최신순 정렬
  // sort() 함수로 내림차순 정렬하기 b-a
  const handleNewest = (order) => {
    // 최신순 정렬을 위해서 Date 객체의 getTime 함수로 밀리세컨 단위로 변경 + rest 문법
    const newestBooks = [...books.documents].sort((book1, book2) => new Date(book2[order]).getTime() - new Date(book1[order]).getTime());
    setBooks({
      documents: newestBooks,
      meta: metaPage
    });
  }

  // 높은 가격 순 정렬
  const handleHighPrice = (order) => {
    const highPriceBooks = [...books.documents].sort((book1, book2) => book2[order] - book1[order]);
    setBooks({
      documents: highPriceBooks,
      meta: metaPage
    });
  }

  // 낮은 가격순 정렬
  // sort() 함수로 오름차순 정렬하기 a-b
  const handleLowPrice = (order) => {
    const lowPriceBooks = [...books.documents].sort((book1, book2) => book1[order] - book2[order]);
    setBooks({
      documents: lowPriceBooks,
      meta: metaPage
    });
  };

  // 모달 - 장바구니 창
  const [updateToggle, setUpdateToggle] = useState(false);

  const onModal = (value) => {
    setUpdateToggle(value)
  }

  const handleBookPage = (value) => {
    setBookPage(value);
  }

  const handleNextPage = (page) => {
    bookSearchHttpHandler(query, true, page);
  }
  
  return (
    <AppStateContext.Provider
      value={{
        books,               // API 호출한 도서 정보
        searchBook,          // 검색어
        orders,              // 장바구니에 저장된 값
        addToOrder,          // 장바구니 추가된 값
        remove,              // 장바구니 제거         
        removeAll,           // 장바구니 담긴 값 전체 제거
        handleNewest,        // 최신순으로 정렬 시 사용
        handleHighPrice,     // 높은 가격 순 정렬 시 사용
        handleLowPrice,      // 낮은 가격순 정렬 시 사용
        onModal,             // 장바구니 창
        updateToggle,        // 장바구니 담기 전 false /  담은 후 true
        setUpdateToggle,
        bookListCounts,      // 한 페이지에 보여질 문서의 개수
        setBookListCounts,
        // handleBookListCounts,// 한 페이지에 보여질 문서의 개수 정렬시 사용 - 9개, 12개, 15개
        bookPage,            // 현재 페이지 위치
        setBookPage,
        handleBookPage,
        handleNextPage
      }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;