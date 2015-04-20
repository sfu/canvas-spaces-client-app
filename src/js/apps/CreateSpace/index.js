import ObjectAssign from 'object-assign';
import React from 'react';

import GroupNameField from './GroupNameField';
import GroupDescriptionField from './GroupDescriptionField';
import SpaceJoinLevelField from './SpaceJoinLevelField';

const CreateSpace = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      space: {
        name: null,
        description: null,
        join_level: 'invitation',
        initial_members: []
      },
      errors: []
    };
  },

  setError


  updateState(data) {
    const newSpaceState = ObjectAssign({}, this.state.space, data);
    this.setState({
      space: newSpaceState,
      errors: this.state.errors
    });
  },

  radioButtonChange(event) {
    const val = this.refs.join_level_radio_group.getChecked().value;
    var newState = ObjectAssign({}, this.state, {space: {join_level: val}});
    console.log('newstate', newState);
    this.setState({
      space: { join_level: this.refs.join_level_radio_group.getChecked().value }
    });
  },

  render() {
    const commonProps = {
      update: this.updateState
    };
    return (
      <div>
        <h2>Create New Space</h2>
        <div className="ic-Form-group ic-Form-group--horizontal">

          <GroupNameField
            value={this.state.space.name}
            {...commonProps}
          />

          <GroupDescriptionField
            name="space_description"
            label="Description"
            placeholder="A longer description of the purpose of your group"
            value={this.state.space.description}
            {...commonProps}
          />

          <SpaceJoinLevelField
            checked={this.state.space.join_level}
            {...commonProps}
          />

          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>

        </div>
      </div>
    );
  }
});


export default CreateSpace;
