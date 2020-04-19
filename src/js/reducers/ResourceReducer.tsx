import { Record as ImRecord } from 'immutable';

import { ResourceAction } from '../actions/ResourceAction';

export type SearchData = {
  distr: Array<Record<string, any>>;
  evalu: Array<Record<string, any>>;
};

export class SearchState extends ImRecord<{
  year: number;
  resources: SearchData;
}>({
  year: 2018,
  resources: {} as SearchData,
}) {}

export default function ResourceReducer(state = new SearchState(), action: ResourceAction): SearchState {
  switch (action.type) {
    case 'SET_RESOURCE': {
      return { ...state, resources: action.payload };
    }

    default:
      return state;
  }
}
