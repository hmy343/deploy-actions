import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Library from '../components/Library';
import Order from '../components/Order'
import ScrollTop from '../components/ScrollTop';
import TitleImg from '../components/TitleImg';
import '../css/MainPage.scss'

const MainPage = () => {
  return (
    <div>
      {/* ScrollTop!! */}
      <ScrollTop />
      {/* 헤더 */}
      <Header />

      {/* 타이틀 이미지  */}
      <TitleImg />

      <div>
        {/* 북 리스트 / 검색  */}
        <Library />
      </div>
      {/* 장바구니 */}
      <Order />

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default MainPage;