import { History } from 'history';
import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { List } from 'immutable';

import Graph from '../models/Graph';

import GraphReducer from './GraphReducer';

export interface State {
  router: RouterState;
  graphs: List<Graph>;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    graphs: GraphReducer,
  });
