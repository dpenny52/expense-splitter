// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import EnterExpense from './components/EnterExpense';
import ViewExpenses from './components/ViewExpenses';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={EnterExpense} />
    <Route path="/view_expenses" component={ViewExpenses} />
  </Router>
);

export default Routes;