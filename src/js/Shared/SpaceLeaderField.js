'use strict';

import React from 'react';
import ICSelect from 'FormComponents/ICSelect';
import HandleErrorsMixin from 'mixins/HandleErrorsMixin';
import GetValueLinkMixin from 'mixins/GetValueLinkMixin';

const {PropTypes} = React;
const SpaceLeaderField = React.createClass({

  mixins: [
    HandleErrorsMixin,
    GetValueLinkMixin
  ],

  propTypes: {
    onChange: PropTypes.func,
    users: PropTypes.array.isRequired,
    valueLink: PropTypes.shape({
      value: PropTypes.number,
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
      errorLink: null
    };
  },

  handleChange(event) {
    const space_description = event.target.value;
    this.clearError();
    this.getValueLink(this.props).requestChange(space_description);
  },

  render() {
    const options = this.props.users.map(user => {
      return { value: user.id, name: user.name };
    });
    return (
      <ICSelect
        ref="leader_id"
        name="leader_id"
        label="Leader"
        onChange={this.handleChange}
        value={this.getValueLink(this.props).value}
        error={this.getErrorLink(this.props).value}
        onBlur={this.validate}
        options={options}
      />
    );
  }

});

export default SpaceLeaderField;
