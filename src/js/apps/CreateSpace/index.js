import React from 'react';
import Router from 'react-router';
import GroupNameField from './GroupNameField';
const { Link } = Router;

const CreateSpace = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    console.log('gis');
    return {
      group: {
        group_name: null,
        group_description: null,
        join_level: 'public',
        initial_members: []
      },
      step: this.context.router.getCurrentParams().step || null
    };
  },

  // statics: {
  //   willTransitionTo: (transition, params) => { console.log('willTransitionTo', transition, params); },
  //   willTransitionFrom: (transition, component) => { console.log('willTransitionFrom', transition, component); },
  // },

  renderStep() {
    var common_props = {
      data: this.state.group,
      next: this.nextStep,
      prev: this.previousStep,
      save: this.saveValues
    };

    switch(parseInt(this.context.router.getCurrentParams().step)) {
      case 1:
        delete common_props.prev;
        return <GroupNameField {...common_props} />
        // return <GroupNameField {...common_props} />
        break;
      case 2:
      return <p>Step 2</p>
        // return <GroupDescriptionField {...common_props} />
        break;
      case 3:
      return <p>Step 3</p>
        // return <GroupJoinLevelField {...common_props} />
        break;
      case 4:
        // return <GroupMembershipFields {...common_props} />
        break;
      case 5:
        // return <Confirmation  {...common_props} />
        break;
      case 6:
        return <div><h3>Success!</h3><p>Your space {this.state.group.group_name} will be created.</p></div>
        break;
      default:
        delete common_props.prev;
        return this.defaultContent();
        break;
    }
  },

  defaultContent() {
    console.log('defaultContent');
    return (
      <div>
      <p>This lets you create a new Canvas Space. Pretty sweet, eh?</p>
      <Link className="btn" to="create_space_form" params={{step: 1}}>Get Started</Link><br/>
      </div>
    )
  },

  render() {
    return (
      <div>
        <h2>Create New Space</h2>
        <h3>Step {this.state.step}</h3>
        {this.renderStep(this.state.step)}
      </div>
    );
  }
});


export default CreateSpace;
