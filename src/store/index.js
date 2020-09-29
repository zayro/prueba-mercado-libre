import { createStore } from 'redux';
import  { reducer, initialState } from './redux';

// create store with redux
export const store = createStore(
    reducer,
    initialState
  );


export default store;

