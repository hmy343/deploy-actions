import React, { useState } from "react";
import Pagination from "react-js-pagination";
import useBooks from "../hooks/useBooks";
import useBookInfo from "../hooks/useBookInfo";
import '../css/Pagination.scss'

const Paging = ({count}) => {
  const { books } = useBooks();
  const { handleBookPage, bookPage, setBookPage, handleNextPage } = useBookInfo();

   // ?. 옵셔널 체이닝(optional chaining)
  const totalBookCounts = books?.meta?.total_count;
  const calcPageRange = () => {
    const result = totalBookCounts / count;
  
  // 조건식과 맞지 않으면 5 페이지씩 출력
  // 이동할 수 있는 페이지를 5 페이지씩 출력한다.
  return result < 5 ? result : 5;
}

  const setPage = async (page) => {
    // console.log(page);
      handleBookPage(page);
      handleNextPage(page);
  }

    return (
      <Pagination
        activePage={bookPage}
        itemsCountPerPage={count}
        totalItemsCount={totalBookCounts ? totalBookCounts : 0}
        pageRangeDisplayed={calcPageRange()}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    );
  };

export default Paging;