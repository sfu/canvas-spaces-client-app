import ObjectAssign from 'object-assign';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

import SpaceNameField from './SpaceNameField';
import SpaceDescriptionField from './SpaceDescriptionField';
import SpaceJoinLevelField from './SpaceJoinLevelField';
import SpaceInitialUsersField from './SpaceInitialUsersField';
import SpaceMaillistsField from './SpaceMaillistsField';

const CreateSpace = React.createClass({
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      space: {
        name: '',
        description: '',
        join_level: 'invitation',
        members: [],
        maillists: []
      },
      errors: {
        name: '',
        description: '',
        join_level: '',
        members: '',
        maillists: ''
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
              valueLink={this.linkState('space.description')}
              errorLink={this.linkState('errors.description')}
            />
          </fieldset>

          <fieldset>
            <legend>Privacy Options</legend>

            <SpaceJoinLevelField
              checked={this.state.space.join_level}
              valueLink={this.linkState('space.join_level')}
            />
          </fieldset>

          <fieldset>
            <legend>Space Membership</legend>
            <SpaceInitialUsersField
              valueLink={this.linkState('space.members')}
              errorLink={this.linkState('errors.members')}
            />

            <SpaceMaillistsField
              valueLink={this.linkState('space.maillists')}
              errorLink={this.linkState('errors.maillists')}
            />

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
