import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
    </Provider>,
)
