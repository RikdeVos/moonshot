import React from 'react';

import './LaunchList.css';
import { getAgenciesInLaunch } from '../../utils/launchAgencies';
import { Launch } from '../../models/launch.interface';
import { Agency } from '../../models/agency.interface';

interface IProps {
  launches: Launch[];
  agency: Agency | null;
}

const launchList: React.FunctionComponent<IProps> = (props: IProps) => (
  <>
    <h2>Launch List</h2>
    {props.agency ? 'we have agency' : 'no agency'}
    <ul className="LaunchList">
      {props.launches
        .filter(
          (launch) =>
            !props.agency ||
            getAgenciesInLaunch(launch).some(
              (agency) => agency.id === props.agency?.id
            )
        )
        .map((launch) => (
          <li key={launch.id}>{launch.name}</li>
        ))}
    </ul>
  </>
);

export default launchList;
