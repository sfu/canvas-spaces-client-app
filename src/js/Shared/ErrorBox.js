'use strict';
import React from 'react';

const ErrorBox = React.createClass({

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
