import {
  RootState,
  ActionTypes,
  LOAD_LAUNCHES,
  LOADED_LAUNCHES,
  LOAD_AGENCIES,
  LOADED_AGENCIES,
  API_ERROR,
} from './types';
import moment from 'moment';

const initialState: RootState = {
  agencies: [],
  launches: [],
  loading: false,
  error: false,
  startDate: moment(),
  endDate: moment(),
};

export function rootReducer(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case LOAD_LAUNCHES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOADED_LAUNCHES:
      return {
        ...state,
        launches: action.payload,
        loading: false,
      };
    case LOAD_AGENCIES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOADED_AGENCIES:
      return {
        ...state,
        agencies: action.payload,
        loading: false,
      };
    case API_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
