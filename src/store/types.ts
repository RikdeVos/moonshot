import { Launch } from '../models/launch.interface';
import { Agency } from '../models/agency.interface';

export interface RootState {
  launches: Launch[];
  agencies: Agency[];
  loading: boolean;
  error: boolean;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export const LOAD_LAUNCHES = 'LOAD_LAUNCHES';
export const LOADED_LAUNCHES = 'LOADED_LAUNCHES';

export const LOAD_AGENCIES = 'LOAD_AGENCIES';
export const LOADED_AGENCIES = 'LOADED_AGENCIES';

export const API_ERROR = 'API_ERROR';

interface LoadLaunchesAction {
  type: typeof LOAD_LAUNCHES;
  payload: { startDate: moment.Moment; endDate: moment.Moment };
}

interface LoadedLaunchesAction {
  type: typeof LOADED_LAUNCHES;
  payload: Launch[];
}

interface LoadAgenciesAction {
  type: typeof LOAD_AGENCIES;
}

interface LoadedAgenciesAction {
  type: typeof LOADED_AGENCIES;
  payload: Agency[];
}

interface ApiErrorAction {
  type: typeof API_ERROR;
}

export type ActionTypes =
  | LoadLaunchesAction
  | LoadedLaunchesAction
  | LoadAgenciesAction
  | LoadedAgenciesAction
  | ApiErrorAction;
