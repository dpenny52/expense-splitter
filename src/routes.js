// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import EnterExpense from './components/EnterExpense';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/enter_expense" component={EnterExpense} />
  </Router>
);

export default Routes;