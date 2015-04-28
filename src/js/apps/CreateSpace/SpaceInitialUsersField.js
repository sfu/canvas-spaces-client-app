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
    const unique = this.state.tags.indexOf(tag) === -1;

    if (!unique) {
      this.setError(`"${tag}" already exists`);
      return done(false);
    }

    if (tag !== '') {
      api.validate_sfu_username(tag, (result) => {
        this.setError(`"${tag}" is not a valid Canvas user`)
        done(result.valid_user === true);
      });
    }
  },

  focusInput(event) {
    this.refs.space_initial_users.getDOMNode().querySelector('input').focus();
  },

  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    }
  },

  getErrorLink(props) {
    return props.errorLink || {
      value: props.value,
      requestChange: this.setError
    }
  },

  onTagAdd(tag) {
    this.getValueLink(this.props).requestChange(this.state.tags);
  },

  onTagRemove(tag) {
    const newtags = this.state.tags.filter(function(a) { return a !== tag });
    this.getValueLink(this.props).requestChange(newtags);
  },

  setError(error) {
    this.getErrorLink(this.props).requestChange(error);
  },

  clearError() {
    this.getErrorLink(this.props).requestChange('');
  },

  onChangeInput(tag) {
    this.clearError();
  },

  renderError() {
    const error = this.getErrorLink(this.props).value;
    if (error) {
      return (
        <div className="ic-Form-message ic-Form-message--error">
          <div className="ic-Form-message__Layout">
            <i className="icon-warning" role="presentation"></i>
              {error}
          </div>
        </div>
      )
    } else {
      return null;
    }
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
            onTagAdd={this.onTagAdd}
            onTagRemove={this.onTagRemove}
            onBeforeTag={this.onBeforeTag}
            onChangeInput={this.onChangeInput}
          />
        </div>
        {this.renderError()}
      </div>
    );
  }

});

export default SpaceInitialUsersField;