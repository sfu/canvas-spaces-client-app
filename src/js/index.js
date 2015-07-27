'use strict';

import React from 'react';
import Router from 'react-router';
import CreateSpace from 'apps/CreateSpace';
import MySpaces from 'apps/MySpaces';
import SpaceDirectory from 'apps/SpaceDirectory';

const { Route, NotFoundRoute, DefaultRoute, RouteHandler } = Router;
const canvas_spaces_config = window.ENV.CANVAS_SPACES || {};

if (__DEV__) {
  require('../scss/dev.scss');
}

const App = React.createClass({
  render() {
    return (
      <RouteHandler serverConfig={canvas_spaces_config} />
    );
  }
});

const NotFound = React.createClass({
  render() {
    const divstyle = {
      textAlign: 'center',
      paddingTop: '35px'
    };

    const imgstyle = {
      width: '25%'
    };

    return (
      <div style={divstyle}>
        <img style={imgstyle} src="/images/sadpanda.svg" alt="The panda is sad because it couldn't find the page you wanted" />
        <h2>Page Not Found</h2>
        <p>Oops, we couldn't find that page.</p>
      </div>
    );
  }
});

const route_base_path = __DEV__ ? '/' : '/canvas_spaces';
const routes = (
  <Route name="app" path={route_base_path} handler={App}>
    <Route name="create" handler={CreateSpace} />
    <Route name="mine" handler={MySpaces} />
    <Route name="public" handler={SpaceDirectory} />
    <DefaultRoute handler={MySpaces} />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById('CanvasSpacesApp'));
});

export default App;
