import React, { useState } from 'react';
import BookList from './BookList';
import useNewest from '../hooks/useNewest';
import useBooks from '../hooks/useBooks';
import useBookInfo from '../hooks/useBookInfo';
import Pagination from '../components/Pagination'
import '../css/Library.scss'

const Library = () => {

  const { books, searchBook } = useBooks();
  const { handleNewest, handleHighPrice, handleLowPrice } = useNewest();
  const { bookListCounts, setBookListCounts, handleBookListCounts } = useBookInfo();

  const [text, setText] = useState('');

  // enter key 눌렀을 때 의미
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      searchBook(text);
    }
  };
  // text 검색어가 바뀔 때 호출되는 함수
  const onTextUpdate = (e) => {
    setText(e.target.value);
  };

  

  return (
    <div className='Library'>
      <div className='max-wrap'>
        <div className='book-search'>
          <input
            type='search'
            placeholder='검색어를 입력해 주세요.'
            name='query'
            onKeyDown={onEnter} // enter
            onChange={onTextUpdate} // change
            value={text} // view
            className='input_search'
          />
        </div>
        <div className='line' />

        <div className='books-option-wrap'>

          <div className='books-orders'>
            <button onClick={() => handleNewest('datetime')}>최신순</button>
            <button onClick={() => handleHighPrice('price')}>높은 가격 순</button>
            <button onClick={() => handleLowPrice('price')}>낮은 가격 순</button>
          </div>

          <select className='books-option'
                  onChange={(e) => setBookListCounts(e.target.value)}
                  value={bookListCounts}>
            <option value='9'>9개</option>
            <option value='12'>12개</option>
            <option value='15'>15개</option>
          </select>
        </div>
        <ul>
          <BookList />
        </ul>
        {/* 페이지네이션 */}
        <Pagination count={parseInt( bookListCounts)} />
      </div>
    </div>
  );
};

export default Library;