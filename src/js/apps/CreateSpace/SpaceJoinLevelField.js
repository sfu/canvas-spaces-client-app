import React from 'react';
const {PropTypes} = React;
import ICRadioButtonGroup from 'FormComponents/ICRadioButtonGroup';

const radioButtons = [
  {
    label: 'Anyone can join this Space',
    value: 'public'
  },
  {
    label: 'People must be invited to join this Space',
    value: 'invitation'
  }
];

const SpaceJoinLevelField = React.createClass({

  propTypes: {
    checked: PropTypes.string.isRequired,
  },

  handleChange(event) {
    const checkedValue = this.refs.join_level_radio_group.getChecked().value;
    this.props.update({join_level: checkedValue});
  },

  render() {
    return (
      <ICRadioButtonGroup
        ref="join_level_radio_group"
        name="join_level"
        onChange={this.handleChange}
        checked={this.props.checked}
        buttonItems={radioButtons}
      />

    );
  }

});

export default SpaceJoinLevelField;