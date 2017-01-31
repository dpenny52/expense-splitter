import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import expenseSplitterApp from './reducers';
import Routes from './routes';

let store = createStore(expenseSplitterApp);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
