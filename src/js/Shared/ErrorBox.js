'use strict';
import React from 'react';
const {PropTypes} = React;

const ErrorBox = React.createClass({
  propTypes: {
    error: PropTypes.string,
  },

  render() {
    if (!this.props.error) { return <div />; }
    return (
      <div className="alert alert-error">
        <strong>Error:</strong><span> {this.props.error}</span>
      </div>
    );
  }

});

export default ErrorBox;
