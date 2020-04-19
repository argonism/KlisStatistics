import { SearchData, SearchState } from '../reducers/ResourceReducer';

export type ResourceAction =
  | {
      type: 'SET_RESOURCE';
      payload: SearchData;
    }
  | {
      type: 'SET_YEAR';
      payload: SearchData;
    };

export function SetResource(payload: SearchData): ResourceAction {
  return {
    type: 'SET_RESOURCE',
    payload: payload,
  };
}
