import React, { Component } from 'react';
import './Layout.css';

export default class Layout extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    console.log('willmount');
  }

  render() {
    return (
      <>
        <div className="Layout">
          <div className="Layout__content">{this.props.children}</div>
        </div>
      </>
    );
  }
}
