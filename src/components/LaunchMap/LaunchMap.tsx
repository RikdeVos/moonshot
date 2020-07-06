import { Map, GoogleApiWrapper } from 'google-maps-react';

import React from 'react';

import './LaunchMap.css';

interface IProps {
  // google: any;
}
interface IState {}

export default class LaunchMap extends React.Component<IProps, IState> {
  render() {
    return (
      <>
        {/*
        <Map
          google={this.props.google}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        ></Map>
        */}
      </>
    );
  }
}

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCJVfQsMePNRGteUD_uTZ-HC9mIJn1dlRs',
// })(LaunchMap);
