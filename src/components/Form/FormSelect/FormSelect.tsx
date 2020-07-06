import React, { ChangeEvent } from 'react';

import './FormSelect.css';

interface IProps {
  title: string;
  value?: string;
  changed: (newValue: string) => void;
  options: {
    value: string;
    displayValue: string;
  }[];
}

const formSelect: React.FunctionComponent<IProps> = (props: IProps) => (
  <label className="FormSelect">
    <strong>{props.title}</strong>
    <select
      value={props.value}
      onChange={(event) => props.changed(event.target.value)}
    >
      <option value="0">Select a value</option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  </label>
);

export default formSelect;
