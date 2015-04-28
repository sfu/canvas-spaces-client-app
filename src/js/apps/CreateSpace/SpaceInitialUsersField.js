import React from 'react/addons';
import TagsInput from 'react-tagsinput';
import api from 'utils/api';

const {PropTypes} = React;

const SpaceInitialUsersField = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    valueLink: PropTypes.shape({
      value: PropTypes.array.isRequired,
      requestChange: PropTypes.func.isRequired
    }).isRequired,
    errorLink: PropTypes.shape({
      value: PropTypes.string.isRequired,
      requestChange: PropTypes.func.isRequired
    }).isRequired
  },

  getInitialState() {
    return {
      tags: []
    };
  },

  transform(tag) {
    return tag.trim().replace('@sfu.ca', '');
  },

  validate: function (tag, done) {
    var unique = this.state.tags.indexOf(tag) === -1;
    if (!unique) { return done(false); }

    api.validate_sfu_username(tag, (result) => {
      const ok = result.valid_user === true;
      done(ok);
    });
  },

  focusInput(event) {
    this.refs.space_initial_users.getDOMNode().querySelector('input').focus();
  },

  render: function() {
    return (
      <div onClick={this.focusInput} className="ic-Form-control">
        <label htmlFor="space_initial_users" className="ic-Label">Initial Users</label>
        <div className="SFU-tagsinput-wrapper">
          <TagsInput
            name="space_initial_users"
            ref="space_initial_users"
            valueLink={this.linkState('tags')}
            placeholder="e.g. kipling@sfu.ca"
            classNamespace="SFU"
            addKeys={[9, 13, 32, 188]} // tab, return, space, comma
            removeKeys={[]}
            transform={this.transform}
            validateAsync={this.validate}
          />
        </div>
      </div>
    );
  }

});

export default SpaceInitialUsersField;