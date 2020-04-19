import Graph from '../models/Graph';

export type GraphAction =
  | {
      type: 'SET_GRAPHS';
      payload: Array<Graph>;
    }
  | {
      type: 'ADD_GRAPH';
      payload: Graph;
    }
  | {
      type: 'DELETE_GRAPH';
      payload: number;
    };

export function AddGraph(payload: Graph): GraphAction {
  return {
    type: 'ADD_GRAPH',
    payload: payload,
  };
}

export function SetGraph(payload: Array<Graph>): GraphAction {
  return {
    type: 'SET_GRAPHS',
    payload: payload,
  };
}

export function DeleteGraph(payload: number): GraphAction {
  return {
    type: 'DELETE_GRAPH',
    payload: payload,
  };
}
