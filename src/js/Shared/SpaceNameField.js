'use strict';

import React from 'react';
import ICInputField from 'FormComponents/ICInputField';
import api from 'utils/api';
import HandleErrorsMixin from 'mixins/HandleErrorsMixin';
import GetValueLinkMixin from 'mixins/GetValueLinkMixin';

const {PropTypes} = React;
const SpaceNameField = React.createClass({

  mixins: [
    HandleErrorsMixin,
    GetValueLinkMixin
  ],

  propTypes: {
    value: PropTypes.string,
    onChange: PropTypes.func,
    valueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    }).isRequired,
    errorLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    }).isRequired,
    validate: PropTypes.func
  },

  handleChange(event) {
    const space_name = event.target.value;
    this.clearError();
    this.getValueLink(this.props).requestChange(space_name);
  },

  defaultValidate(space_name) {
    // no empty names
    if (space_name === '') {
      this.setError('You must enter a name for your Space');
      return;
    }

    // validate name against api
    api.validate_field('name', space_name, (result) => {
      if (!result.valid_group_name) {
        this.setError(result.message);
      }
    });
  },

  validate(event) {
    const space_name = event.target.value.trim();
    const validate = this.props.validate ? this.props.validate : this.defaultValidate;
    validate(space_name);
  },

  render() {
    console.log(this.props);
    return (
      <ICInputField
        ref="space_name"
        name="space_name"
        label="Space Name"
        placeholder="A short, descriptive name for your group (e.g. Basket Weaving Club)"
        autoFocus="true"
        onChange={this.handleChange}
        value={this.getValueLink(this.props).value}
        error={this.getErrorLink(this.props).value}
        onBlur={this.validate}
      />
    );
  }

});

export default SpaceNameField;
