import React from 'react';
import ICInputField from 'FormComponents/ICInputField';

const GroupDescriptionField = React.createClass({

  render() {
    return (
      <ICInputField
        value={this.props.value}
        {... this.props}
      />
    );
  }

});

export default GroupDescriptionField;