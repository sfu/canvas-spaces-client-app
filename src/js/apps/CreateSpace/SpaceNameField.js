import React from 'react';
import ICInputField from 'FormComponents/ICInputField';

const SpaceNameField = React.createClass({

  handleChange(event) {
    this.props.update({name: this.refs.space_name.getValue()});
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
      />
    );
  }

});

export default SpaceNameField;