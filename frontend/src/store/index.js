import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import userSaga from '../sagas/userSaga';
import messageSaga from '../sagas/messageSaga';
import projectSaga from '../sagas/projectSaga';
import demandSaga from '../sagas/demandSaga';
import taskSaga from '../sagas/taskSaga';
import categorySaga from '../sagas/categorySaga';
import calendarSaga from '../sagas/calendarSaga';
import milestoneSaga from '../sagas/milestoneSaga';


const sagaMiddleware = createSagaMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(reducers, enhancer);

// FIXME: load sagas based on router context
[userSaga, messageSaga, projectSaga,taskSaga, demandSaga, categorySaga, calendarSaga, milestoneSaga].map(saga => sagaMiddleware.run(saga));

export default store;
