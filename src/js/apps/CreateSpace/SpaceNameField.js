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
    const space_name = event.target.value;
    this.clearError();
    this.getValueLink(this.props).requestChange(space_name);
  },

  validate(event) {
    const space_name = event.target.value;

    // no empty names
    if (space_name === '') {
      this.setError('You must enter a name for your Space');
      return;
    }

    // validate name against api
    api.validate_space_name(space_name, (result) => {
      if (result.status === 'error' && result.error === 'ERR_DUPLICATE_SPACE_NAME') {
        this.setError(`A Space named ${space_name} already exists`);
      }
    });
  },

  render() {
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