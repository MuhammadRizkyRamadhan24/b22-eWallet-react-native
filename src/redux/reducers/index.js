import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import carts from './carts';
import auth from './auth';
// import products from './products';
// import categories from './categories';
import transactions from './transactions';
import topups from './topups';
import transfers from './transfers';
import users from './users';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  // carts,
  // products,
  // categories,
  transactions,
  users,
  transfers,
  topups,
});

export default rootReducer;
