import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import App from "./App";
import store from './store/Store';
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <div> <Toaster/> </div>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


