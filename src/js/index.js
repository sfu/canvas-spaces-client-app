import React from 'react';
import Router from 'react-router';
import CreateSpace from 'apps/CreateSpace';
import MySpaces from 'apps/MySpaces';
import SpaceDirectory from 'apps/SpaceDirectory';

const { Route, NotFoundRoute, DefaultRoute, Link, RouteHandler } = Router;

if (__DEV__) {
  require('../scss/dev.scss');
}

const App = React.createClass({
  render() {

    return (
      <div>
        <h1 style={{ marginTop: 0}}>Canvas Spaces</h1>
        <ul>
          <li><Link to="app">Dashboard</Link></li>
          <li><Link to="create_space">Create New Space</Link></li>
          <li><Link to="my_spaces">My Spaces</Link></li>
          <li><Link to="space_directory">Public Spaces</Link></li>
        </ul>
        <div id="Handler">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

const Dashboard = React.createClass({
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }
});

const route_base_path = __DEV__ ? '/' : '/canvasspaces';
//TODO: make this render a proper not-found handler, preferably with a sad panda. Bonus points if it sheds a single,  animated, tear. */}
const routes = (
  <Route name="app" path={route_base_path} handler={App}>
    <Route name="create_space" handler={CreateSpace} />
    <Route name="my_spaces" handler={MySpaces} />
    <Route name="space_directory" handler={SpaceDirectory} />
    <DefaultRoute handler={Dashboard} />
    <NotFoundRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('CanvasSpacesApp'))
})

export default App;