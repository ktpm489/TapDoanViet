import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import appStore from './../reducers';
// Logger with default options
import logger from 'redux-logger';

const store = createStore(
    appStore,
    applyMiddleware(thunk)
);
export default store;