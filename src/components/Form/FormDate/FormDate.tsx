import React, { ChangeEvent } from 'react';
import moment from 'moment';

import './FormDate.css';

interface IProps {
  title: string;
  value: moment.Moment;
  changed: (newValue: moment.Moment) => void;
}

const formDate: React.FunctionComponent<IProps> = (props: IProps) => (
  <label className="FormDate">
    <strong>{props.title}</strong>
    <input
      type="date"
      value={props.value.format('YYYY-MM-DD')}
      onChange={(event) =>
        props.changed(moment(event.target.value, 'YYYY-MM-DD'))
      }
    />
  </label>
);

export default formDate;
