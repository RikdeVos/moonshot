import { ActionTypes, LOAD_LAUNCHES, LOADED_LAUNCHES, LOAD_AGENCIES, LOADED_AGENCIES } from './types';
import { Launch } from '../models/launch.interface';
import { Agency } from '../models/agency.interface';

export function loadLaunches(startDate: moment.Moment, endDate: moment.Moment): ActionTypes {
  return {
    type: LOAD_LAUNCHES,
    payload: { startDate, endDate },
  };
}
export function loadedLaunches(launches: Launch[]): ActionTypes {
  return {
    type: LOADED_LAUNCHES,
    payload: launches,
  };
}
export function loadAgencies(): ActionTypes {
  return {
    type: LOAD_AGENCIES,
  };
}
export function loadedAgencies(agencies: Agency[]): ActionTypes {
  return {
    type: LOADED_AGENCIES,
    payload: agencies,
  };
}
