'use strict';

import React from 'react';
const {PropTypes} = React;

const controlClass = 'ic-Form-control';
const labelClass = 'ic-Label';
const inputClass = 'ic-Input';

const ICInputField = React.createClass({

  propTypes: {
    autoFocus: PropTypes.bool,
    error: PropTypes.string,
    inputClasses: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelClasses: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      onBlur: () => {},
      autoFocus: false
    };
  },
  getValue() {
    return this.getDOMNode().querySelector('input[type="text"]').value;
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
        <input
          type="text"
          id={this.props.name}
          className={inputClasses()}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          autoFocus={this.props.autoFocus}
        />
        {this.error()}
      </div>
    );
  }

});

export default ICInputField;
