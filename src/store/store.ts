// store.js
import { createStore } from 'redux';
import gridReducer from '../reducers/reducers';

const store = createStore(gridReducer);

export default store;
