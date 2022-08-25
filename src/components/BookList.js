import React from 'react';
import useBooks from '../hooks/useBooks';
import useActions from '../hooks/useActions';
import { MdShoppingCart } from "react-icons/md";
import '../css/BookList.scss';
import defaultImage from '../assets/NoPicture.png';
import { Link } from 'react-router-dom';
import useBookInfo from '../hooks/useBookInfo';



const BookList = () => {

  const { books } = useBooks();
  const { addToOrder, onModal } = useActions();
  
  return (
    <div className='book-list-wrap'>
      {books?.documents?.map((book, idx) => {
        const click = () => {
           addToOrder(book);
         };

        //  품절 값 
       const sPrice = book.sale_price;
        return (
          // map 함수 사용 시 유니크 key 값이 필요
          <div className='info-wrap' key={`${book.isbn}-${idx}`}>
            {/* 책 이미지 */}
            <div>
              {/* 책 이미지 클릭 시, 해당 책의 상세 페이지 이동 */}
              <Link to='book-detail' state={book}>
                <div className='book-info-img'>
                  <img src={book.thumbnail ? book.thumbnail : defaultImage} alt={book.thumbnail} />
                  {sPrice === -1 ?
                    <div className='out-of-stock'>품절</div>
                    :
                    <div></div>
                  }
                </div>
              </Link>
            </div>

            {/* 북 정보 */}
            <div className='book-info'>
              <div className='text-of'><b>제목</b> {book.title}</div>
              <div>
                <p>
                <b>정상가 </b>
                {sPrice === -1 ?  <strong>품절</strong>: <span> {book.price.toLocaleString()}</span>}
                </p>
                <p>
                 <b>할인가 </b> 
                {sPrice === -1 ? <strong>품절</strong>:<b>{book.sale_price.toLocaleString()}</b> }
                </p>

              </div>
              {/* CART아이콘 */}
              <div className='cart-icon'>
                <MdShoppingCart onClick={() => {
                  sPrice === -1 ? console.log('품절입니다') : click()
                  onModal(true)
                }} size="22" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;