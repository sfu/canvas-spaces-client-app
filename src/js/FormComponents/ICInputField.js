import React from 'react';
const {PropTypes} = React;

const labelClass = 'ic-Label';
const inputClass = 'ic-Input';

const ICInputField = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    labelClasses: PropTypes.string,
    inputClasses: PropTypes.string
  },

  getValue() {
    return this.getDOMNode().querySelector('input[type="text"]').value;
  },

  render() {
    const labelClasses = this.props.labelClasses ? `${labelClass} ${this.props.labelClasses}` : labelClass;
    const inputClasses = this.props.inputClasses ? `${inputClass} ${this.props.inputClasses}` : inputClass;
    return (
      <div className="ic-Form-control">
        <label
          htmlFor={this.props.name}
          className={labelClasses}>{this.props.label}
        </label>
        <input
          type="text"
          id={this.props.name}
          className={inputClasses}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

});

export default ICInputField;