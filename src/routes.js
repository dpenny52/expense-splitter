// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import EnterExpense from './screens/EnterExpense';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={EnterExpense} />
  </Router>
);

export default Routes;