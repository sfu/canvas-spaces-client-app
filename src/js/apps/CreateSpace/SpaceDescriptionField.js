import React from 'react';
const {PropTypes} = React;
import ICInputField from 'FormComponents/ICInputField';

const SpaceDescriptionField = React.createClass({

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
    const space_description = event.target.value;
    this.clearError();
    this.getValueLink(this.props).requestChange(space_description);
  },

  validate(event) {
    const space_description = event.target.value;

    // no empty descriptions
    if (space_description === '') {
      this.setError('You must enter a description for your Space');
      return;
    }
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
        ref="space_description"
        name="space_description"
        label="Description"
        placeholder="A longer description of the purpose of your group"
        onChange={this.handleChange}
        value={this.getValueLink(this.props).value}
        error={this.getErrorLink(this.props).value}
        onBlur={this.validate}
      />
    );
  }

});

export default SpaceDescriptionField;
