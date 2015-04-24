import React from 'react';
const {PropTypes} = React;
import ICInputField from 'FormComponents/ICInputField';
import api from 'utils/api';

const spacenames = ['Basket Weaving Club'];

const SpaceNameField = React.createClass({

  propTypes: {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onError: PropTypes.func.isRequired,
    valueLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    })
  },

  getDefaultProps() {
    return {
      value: '',
      error: '',
      onChange: () => {},
      valueLink: null
    };
  },

  handleChange(event) {
    console.log('change!');
    const value = this.refs.space_name.getValue();
    if (this.validate(value)) {
      this.setState({error: null});
      this.props.update({name: value});
    } else {
      this.setState({error: `A group named ${value} already exists`});
    }
  },

  validate() {
    const value = this.refs.space_name.getValue();
    return spacenames.indexOf(value) === -1;
  },

  render() {
    return (
      <ICInputField
        name="space_name"
        label="Space Name"
        placeholder="A short, descriptive name for your group (e.g. Basket Weaving Club)"
        onChange={this.handleChange}
        value={this.props.value}
        ref="space_name"
        error={this.state.error}
      />
    );
  }

});

export default SpaceNameField;