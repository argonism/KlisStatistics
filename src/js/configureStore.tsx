import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';

import { State, rootReducer } from './reducers';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const middlewares = [routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middlewares.push(logger);
}

export function configureStore(preloadedState?: State) {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer(history), preloadedState, middlewareEnhancer);
  return store;
}
