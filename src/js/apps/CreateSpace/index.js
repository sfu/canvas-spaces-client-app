import ObjectAssign from 'object-assign';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

import SpaceNameField from './SpaceNameField';
import SpaceDescriptionField from './SpaceDescriptionField';
import SpaceJoinLevelField from './SpaceJoinLevelField';
import SpaceInitialUsersField from './SpaceInitialUsersField';

const CreateSpace = React.createClass({
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      space: {
        name: '',
        description: '',
        join_level: 'invitation',
        initial_members: []
      },
      errors: {
        name: '',
        description: '',
        join_level: '',
        initial_members: ''
      }
    };
  },

  radioButtonChange(event) {
    const val = this.refs.join_level_radio_group.getChecked().value;
    var newState = ObjectAssign({}, this.state, {space: {join_level: val}});
    this.setState({
      space: { join_level: this.refs.join_level_radio_group.getChecked().value }
    });
  },

  render() {
    return (
      <div>
        <h2>Create New Space</h2>
        <div className="ic-Form-group ic-Form-group--horizontal">

          <fieldset>
            <legend>Name and Description</legend>
            <SpaceNameField
              valueLink={this.linkState('space.name')}
              errorLink={this.linkState('errors.name')}
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
