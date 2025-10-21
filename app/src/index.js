/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 21/10/2025 - 18:55:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/10/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
