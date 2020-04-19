import { List } from 'immutable';

import { GraphAction } from '../actions/GraphActions';
import Graph from '../models/Graph';

export default function GraphReducer(state = List.of(new Graph()), action: GraphAction) {
  switch (action.type) {
    case 'SET_GRAPHS': {
      action.payload.unshift(new Graph());
      return List(action.payload);
    }
    case 'ADD_GRAPH': {
      return state.push(action.payload);
    }
    case 'DELETE_GRAPH': {
      const newState = state.filter(graph => {
        return graph.toObject().key !== action.payload;
      });
      return newState;
    }

    default:
      return state;
  }
}
