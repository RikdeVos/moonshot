import React from 'react';

import './LaunchList.css';
import { Launch } from '../../models/launch.interface';

interface IProps {
  launches: Launch[];
}

const launchList: React.FunctionComponent<IProps> = (props: IProps) => (
  <>
    <h2>Launch List</h2>
    <ul className="LaunchList">
      {props.launches.map((launch) => (
        <li key={launch.id}>{launch.name}</li>
      ))}
    </ul>
  </>
);

export default launchList;
