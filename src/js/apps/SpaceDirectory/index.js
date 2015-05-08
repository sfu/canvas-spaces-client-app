'use strict';

import React from 'react';
import api from 'utils/api';

const SpaceDirectory = React.createClass({

  getInitialState() {
    return {
      spaces: []
    };
  },

  // componentDidMount() {
  //   api.get_spaces((response) => {
  //     this.setState({spaces: response});
  //   }.bind(this))
  // },

  render() {
    return (
      <div>
        <h2>Public Spaces</h2>
        <pre>
          {JSON.stringify(this.state.spaces, null, 2)}
        </pre>
      </div>
    );
  }

});

export default SpaceDirectory;
