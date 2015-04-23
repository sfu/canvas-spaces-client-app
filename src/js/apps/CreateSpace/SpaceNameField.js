import React from 'react';
import ICInputField from 'FormComponents/ICInputField';

const spacenames = ['Basket Weaving Club'];

const SpaceNameField = React.createClass({

  getInitialState() {
    return {
      error: null
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