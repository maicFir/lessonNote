/*
 * @Author: maicFir mcodes@163.com
 * @Date: 2022-11-05 20:41:13
 * @LastEditors: maicFir mcodes@163.com
 * @LastEditTime: 2022-11-06 23:17:32
 * @FilePath: /lessonNote/react/02-react-demo/my-app/src/index.tsx
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
