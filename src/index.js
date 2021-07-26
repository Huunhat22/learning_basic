import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    {/* thêm react-router-dom vào  */}
    <Provider store={store}>
      <BrowserRouter>
        {/* B100: thêm notiStack vào */}
        <SnackbarProvider anchorOrigin={{vertical:'top',horizontal:'right'}}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
