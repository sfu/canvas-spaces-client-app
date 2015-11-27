'use strict';

import React from 'react';
const {PropTypes} = React;

const controlClass = 'ic-Form-control';
const labelClass = 'ic-Label';
const inputClass = 'ic-Input';

const ICSelect = React.createClass({

  propTypes: {
    autoFocus: PropTypes.bool.isRequired,
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    error: PropTypes.string,
    inputClasses: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelClasses: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.number
  },

  getDefaultProps() {
    return {
      onBlur: () => {},
      onChange: () => {},
      autoFocus: false,
      options: []
    };
  },
  getValue() {
    return this.getDOMNode().querySelector('input[type="text"]').value;
  },

  options() {
    return this.props.options.map((o, i) => {
      return (
        <option key={i} value={o.value}>{o.name}</option>
      );
    });
  },

  error() {
    if (this.props.error) {
      return (
        <div className="ic-Form-message ic-Form-message--error">
          <div className="ic-Form-message__Layout">
            <i className="icon-warning" role="presentation"></i>
              {this.props.error}
          </div>
        </div>
      );
    } else {
      return null;
    }
  },

  render() {
    const labelClasses = this.props.labelClasses ? `${labelClass} ${this.props.labelClasses}` : labelClass;
    const controlClasses = this.props.error ? `${controlClass} ${controlClass}--has-error` : controlClass;

    const inputClasses = () => {
      const baseClass = this.props.error ? `${inputClass} ${inputClass}--has-error` : inputClass;
      return this.props.inputClasses ? `${baseClass} ${this.props.inputClasses}` : baseClass;
    };

    return (
      <div className={controlClasses}>
        <label
          htmlFor={this.props.name}
          className={labelClasses}>{this.props.label}
        </label>
        <select
          id={this.props.name}
          className={inputClasses()}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          autoFocus={this.props.autoFocus}
          defaultValue={this.props.defaultValue}
        >
          {this.options()}
        </select>
        {this.error()}
      </div>
    );
  }

});

export default ICSelect;
