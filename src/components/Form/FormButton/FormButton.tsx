import React from 'react';
import './FormButton.css';

interface IProps {
  loading: boolean;
}

const formButton: React.FunctionComponent<IProps> = (props: IProps) => (
  <button className="FormButton" type="submit" disabled={props.loading}>
    Update Map
  </button>
);

export default formButton;
