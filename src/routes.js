// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import EnterExpense from './screens/EnterExpense';
import ViewExpenses from './screens/ViewExpenses';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={EnterExpense} />
    <Route path="/view_expenses" component={ViewExpenses} />
  </Router>
);

export default Routes;