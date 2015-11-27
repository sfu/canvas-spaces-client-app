'use strict';

import React from 'react';
const {PropTypes} = React;

const ICRadioButton = React.createClass({

  propTypes: {
    checked: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequied,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="ic-Radio">
        <input
          id={this.props.id}
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <label
          htmlFor={this.props.id}
          className="ic-Label"
        >
          {this.props.label}
        </label>
      </div>
    );
  }

});

export default ICRadioButton;
