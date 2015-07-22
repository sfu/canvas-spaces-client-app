'use strict';

import React from 'react';
import ICInputField from 'FormComponents/ICInputField';
import HandleErrorsMixin from 'mixins/HandleErrorsMixin';
import GetValueLinkMixin from 'mixins/GetValueLinkMixin';

const {PropTypes} = React;
const SpaceMaillistField = React.createClass({

  mixins: [
    HandleErrorsMixin,
    GetValueLinkMixin
  ],

  propTypes: {
    onChange: PropTypes.func,
    validate: PropTypes.func,
    valueLink: PropTypes.shape({
      value: PropTypes.string,
      requestChange: PropTypes.func.isRequired
    }).isRequired,
    errorLink: PropTypes.shape({
      value: PropTypes.string,
      requestChange: PropTypes.func.isRequired
    }).isRequired
  },

  getDefaultProps() {
    return {
      value: '',
      error: '',
      onChange: () => {},
      valueLink: null,
      errorLink: null,
      validate: () => {}
    };
  },

  handleChange(event) {
    const space_name = event.target.value;
    this.clearError();
    this.getValueLink(this.props).requestChange(space_name);
  },

  validate(event) {
    const maillist = event.target.value.trim().replace('@sfu.ca', '');

    if (!maillist || maillist === '') { return; }

    this.props.validate(maillist, (err) => {
      if (err) {
        this.setError(err);
      }
    });
  },

  render() {
    return (
      <ICInputField
        ref="space_maillist"
        name="space_maillist"
        label="Maillist"
        placeholder="A SFU Maillist containing the members of your Space"
        onChange={this.handleChange}
        value={this.getValueLink(this.props).value}
        error={this.getErrorLink(this.props).value}
        onBlur={this.validate}
      />
    );
  }

});

export default SpaceMaillistField;
