import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';

import reducers from '../reducers/index.js';


const store = createStore(reducers, applyMiddleware(promiseMiddleware));
// const store = createStore(reducers);

export default store;
