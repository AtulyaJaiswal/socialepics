import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./Store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


// UpWork
// Resume
// Portfolio
// GitHub


const options = {
  position:"bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
}

root.render(
  <Provider store={store}>
    <ToastContainer {...options}/>
      <App />    
  </Provider>
);

// A feature that allows users to create and share polls with other users.

// A feature that allows users to schedule posts in advance, 
// allowing them to plan and organize their content more efficiently.