import React from 'react/addons';
import TagsInput from 'react-tagsinput';

import api from 'utils/api';

const SpaceInitialUsersField = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      tags: []
    };
  },

  saveTags() {
    console.log('tags: ', this.refs.space_initial_users.getTags().join(', '));
  },

  validate(tag) {
    console.log('validate', tag);
    if (validUsers.indexOf(tag) === -1) {
      return false;
    }

    // succeed fast if tag is empty or a duplicate
    const valueLink = this.refs.space_initial_users.getValueLink();
    if (tag !== "" && valueLink.value.indexOf(tag) === -1) {
      return true;
    }

    // check to see if the user input is a valid sfu/canvas user
  },

  transform(tag) {
    console.log('transform', tag);
    tag = tag.trim();
    tag = tag.replace('@sfu.ca', '');
    return tag;
  },

  onTagAdd(tag) {
    console.log('onTagAdd', tag);
  },

  onChangeInput(val) {
    console.log('onChangeInput', val);
  },

  onChange(val) {
    console.log('onChange', val);
  },

  render: function() {
    return (
      <div className="ic-Form-control">
        <label for="space_initial_users" className="ic-Label">Initial Users</label>
        <div className="ic-Input">
          <TagsInput
            ref="space_initial_users"
            valueLink={this.linkState('tags')}
            placeholder="Add member (e.g. kipling@sfu.ca)"
            addKeys={[9, 13, 32, 188]} // tab, return, space, comma
            removeKeys={[]}
            validate={this.validate}
            transform={this.transform}
            onTagAdd={this.onTagAdd}
            onChangeInput={this.onChangeInput}
          />
        </div>
      </div>
    );
  }

});

export default SpaceInitialUsersField;