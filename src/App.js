import React from 'react';
import './App.css';
import MainPage from './page/MainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppStateProvider from './providers/AppStateProvider';
import BookDetail from './page/BookDetail';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<AppStateProvider>
          <MainPage />
        </AppStateProvider>} />
        <Route path='/book-detail' element={<AppStateProvider>
          <BookDetail />
        </AppStateProvider>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;