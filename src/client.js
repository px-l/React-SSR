import React from 'react';
import ReactDOM from 'react-dom';
// 从 react-router-dom 里边导入 BrowserRouter 组件
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';

import createStore from './store';

const store = createStore(
  window.REDUX_DATA,
);

// 包装一下 App 组件
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
