import { Launch } from '../models/launch.interface';
import { Agency } from '../models/agency.interface';

/**
 * Get all agencies from a launch, and merge into one array.
 *
 * @param launch Launch to get agencies from
 */
export function getAgenciesInLaunch(launch: Launch): Agency[] {
  return launch.location.pads.reduce((allPadAgencies: any, pad) => {
    if (pad.agencies && pad.agencies.length) {
      return [...allPadAgencies, ...pad.agencies];
    } else {
      return allPadAgencies;
    }
  }, []);
}
