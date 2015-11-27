'use strict';

import React from 'react';
const {PropTypes} = React;

import ICRadioButton from 'FormComponents/ICRadioButton';

const ICRadioButtonGroup = React.createClass({

  propTypes: {
    buttonItems: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    checked: PropTypes.bool,
    checkedAndDefaultChecked: (props, propName, componentName) => {
      if (props.checked && props.defaultChecked) {
        return new Error(`both 'checked' and 'defaultChecked' are present on ${componentName}.`);
      }
    },
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  },

  getRadioButtons() {
    return this.getDOMNode().querySelectorAll('input[type="radio"]');
  },

  getChecked() {
    const radioButtons = this.getRadioButtons();
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i];
      }
    }
  },

  renderRadioButtons() {

    return this.props.buttonItems.map( (buttonItem, index) => {
      const id = `${this.props.name}-${index}`;

      const checked = this.props.checked === buttonItem.value ? true : false;
      return (
        <ICRadioButton
          label={buttonItem.label}
          value={buttonItem.value}
          id={id}
          name={this.props.name}
          key={id}
          checked={checked}
          onChange={this.props.onChange}
        />
      );
    });
  },

  render() {
    return (
      <div ref={this.name} className="ic-Form-control ic-Form-control--radio">
        {this.renderRadioButtons()}
      </div>
    );
  }

});

export default ICRadioButtonGroup;
