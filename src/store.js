import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();
const preloadedState = {
   increase: 0
 }
export const store = createStore(
   reducer,
   preloadedState,
   applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

window.store = store;