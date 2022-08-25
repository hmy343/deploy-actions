import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import defaultImage from '../assets/NoPicture.png';
// import '../css/BookDetail.css'
import '../css/BookDetail.scss'

function BookDetail() {
    // 선택한 책의 정보를 state 값이 갖고 있음!!
    const { state } = useLocation();
                           
    var newdate = state.datetime;
    var result1 = newdate.substring(0, 10);

    return (
        <div className='view'>
            <div className='bookWrap'>
                <div className='bookImg'>
                    <img src={state.thumbnail ? state.thumbnail : defaultImage} alt={state.thumbnail} />
                </div>
                <div className='bookInfo'>
                    <div className='bookName'><h2>{state.title}</h2></div>
                    <div className='bookPrice'>
                        <div className='price-text'>
                            <b>정상가 : </b>{state.sale_price === -1 ? <strong className='out-of-stock'>품절</strong> : 
                                <span className='price-line'>{state.price.toLocaleString()}원</span>
                            }
                        </div>
                            <b>할인가 : </b>{state.sale_price === -1 ? <strong className='out-of-stock'>품절</strong> :
                                 <b className='bookSalePrice'>{state.sale_price.toLocaleString()}원</b>
                            }
                    </div>
                    
                    <div className='bookPublisher'><b>출판사 : </b>{state.publisher}</div>
                    <div className='bookPublishDate'><b>출판일 : </b>{result1}</div>
                    <div className='bookAuthors'><b>저자 : </b>{` ${state.authors}`}</div>
                    <hr />
                    <div className='bookContents'><b>도서 내용</b><p>{state.contents}</p></div>
                    <button className='book-btn' onClick={() => window.open(state.url, '_blank')}>더보기</button>
                </div>
            </div>
        </div>
    )
}

export default BookDetail;