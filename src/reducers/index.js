import { combineReducers } from 'redux';
import expenses from './expenses';

const expenseSplitterApp = combineReducers({
  expenses
});

export default expenseSplitterApp;