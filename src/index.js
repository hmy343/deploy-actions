import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// react version 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

// warnning 해결
// react version 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

reportWebVitals();