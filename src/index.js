import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from "react-router-dom";
import router from './router';
import { Provider } from 'react-redux';
import stores from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={stores}>
            <RouterProvider router={router} />
      </Provider>
);