import React from 'react';
import ICInputField from 'FormComponents/ICInputField';

const GroupDescriptionField = React.createClass({

  handleChange(event) {
    this.props.update({description: this.refs.space_description.getValue()});
  },

  render() {
    return (
      <ICInputField
        name="space_description"
        label="Description"
        placeholder="A longer description of the purpose of your group"
        onChange={this.handleChange}
        value={this.props.value}
        ref="space_description"
        {... this.props}
      />
    );
  }

});

export default GroupDescriptionField;