import React from 'react';
import Router from 'react-router';
import CreateSpace from 'apps/CreateSpace';
import MySpaces from 'apps/MySpaces';
import SpaceDirectory from 'apps/SpaceDirectory';

const { Route, NotFoundRoute, DefaultRoute, Link, RouteHandler } = Router;

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Canvas Spaces</h1>
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

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="create_space" path="/create_space" handler={CreateSpace}>
      <Route name="create_space_form" path=":step" handler={CreateSpace} />
    </Route>
    <Route name="my_spaces" handler={MySpaces} />
    <Route name="space_directory" handler={SpaceDirectory} />
    <DefaultRoute handler={Dashboard} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, document.getElementById('CanvasSpacesApp'))
})

export default App;