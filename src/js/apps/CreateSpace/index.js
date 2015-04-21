import ObjectAssign from 'object-assign';
import React from 'react';

import SpaceNameField from './SpaceNameField';
import SpaceDescriptionField from './SpaceDescriptionField';
import SpaceJoinLevelField from './SpaceJoinLevelField';
import SpaceInitialUsersField from './SpaceInitialUsersField';

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

          <fieldset>
            <legend>Name and Description</legend>
            <SpaceNameField
              value={this.state.space.name}
              {...commonProps}
            />

            <SpaceDescriptionField
              value={this.state.space.description}
              {...commonProps}
            />
          </fieldset>

          <fieldset>
            <legend>Privacy Options</legend>

            <SpaceJoinLevelField
              checked={this.state.space.join_level}
              {...commonProps}
            />
          </fieldset>

          <fieldset>
            <legend>Space Membership</legend>
            <SpaceInitialUsersField />
          </fieldset>

          <fieldset>
            <legend>Debug</legend>
            <pre>
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </fieldset>

          <div className="ic-Form-actions">
            <button className="Button" type="button">Cancel</button>
            <button className="Button Button--primary" type="submit">Submit</button>
          </div>

        </div>
      </div>
    );
  }
});


export default CreateSpace;
