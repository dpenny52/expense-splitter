import { combineReducers } from 'redux';
import expenses from './expenses';
import user from './user';

const expenseSplitterApp = combineReducers({
  expenses,
  user
});

export default expenseSplitterApp;