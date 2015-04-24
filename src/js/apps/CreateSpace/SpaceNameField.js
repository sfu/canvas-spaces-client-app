import React from 'react';
const {PropTypes} = React;
import ICInputField from 'FormComponents/ICInputField';
import api from 'utils/api';

const spacenames = ['Basket Weaving Club'];

const SpaceNameField = React.createClass({

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
      valueLink: null
    };
  },

  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    }
  },

  getErrorLink(props) {
    return props.errorLink || {
      value: props.value,
      requestChange: this.setError
    }
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
    api.validate_space_name(space_name).then((result) => {
      if (result.error) {
        this.setError(result.message);
      }
    });

  },

  setError(error) {
    this.getErrorLink(this.props).requestChange(error);
  },

  clearError() {
    this.getErrorLink(this.props).requestChange('');
  },

  render() {
    return (
      <ICInputField
        name="space_name"
        label="Space Name"
        placeholder="A short, descriptive name for your group (e.g. Basket Weaving Club)"
        onChange={this.handleChange}
        value={this.getValueLink(this.props).value}
        ref="space_name"
        error={this.getErrorLink(this.props).value}
        onBlur={this.validate}
      />
    );
  }

});

export default SpaceNameField;