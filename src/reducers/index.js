import { combineReducers } from 'redux';
import expenses from './expenses';
import user from './user';
import split from './split';

const expenseSplitterApp = combineReducers({
  expenses,
  split,
  user
});

export default expenseSplitterApp;