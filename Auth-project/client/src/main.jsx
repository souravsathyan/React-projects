import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor } from "./redux/store.js"
import App from './App.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
)
