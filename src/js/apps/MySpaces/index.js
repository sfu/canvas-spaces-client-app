'use strict';

import React from 'react';
import Router from 'react-router';
import CommonHeader from 'Shared/CommonHeader';
import SpaceTile from 'Shared/SpaceTile';
import LoadMoreDingus from 'Shared/LoadMoreDingus';
import api from 'utils/api';

const {Link} = Router;

const MySpaces = React.createClass({

  getInitialState() {
    return {
      loading: true,
      links: null,
      spaces: []
    };
  },

  componentDidMount() {
    api.get_spaces_for_user('self', (spaces, links) => {
      this.setState({
        loading: false,
        spaces: spaces,
        links: links
      });
    }.bind(this), 3);
  },

  loadMore() {
    this.setState({loading: true}, () => {
      const next_link = this.state.links.next;
        api.load_url(next_link, (spaces, links) => {
          var spaces_array = Array.from(this.state.spaces);
          spaces.forEach((space) => { spaces_array.push(space); });
          this.setState({
            loading: false,
            links: links,
            spaces: spaces_array
          });
        });
    });
  },

  render() {
    const load_more_dingus = () => {
      const dingus = (
        <div className="content-box">
          <div className="grid-row center-md">
            <div className="col-xs-12 col-md-1">
              <LoadMoreDingus
                onClick={this.loadMore}
                disabled={this.state.loading}
                loading={this.state.loading}
              />
            </div>
          </div>
        </div>
      );
      if (this.state.loading || (this.state.links && this.state.links.hasOwnProperty('next'))) {
        return dingus;
      } else {
        return null;
      }
    };

    const spaceTiles = () => {
      if (this.state.spaces.length ===0 && !this.state.loading) {
        return (
          <div className="content-box">
            <div className="grid-row center-md">
              <div className="col-xs-12 col-md-8">
                <img style={{width: '25%', margin: 'auto'}} src="/images/sadpanda.svg" alt="The panda is sad because it couldn't find the page you wanted" />
                <p style={{marginTop: '2em'}}>You don't appear to be a member of any Canvas Spaces.</p><p>Why not <Link to="create_space">create a new space</Link> now?</p>
              </div>
            </div>
          </div>

        );
      }
      const tiles = this.state.spaces.map((space) => {
        return (
          <SpaceTile
            key={`space_${space.id}`}
            name={space.name}
            description={space.description}
            is_leader={space.is_leader}
            space_id={space.id}
          />
        );
      });
      return (
        <div className="SpaceList">
          {tiles}
        </div>
      );

    };

    return (
      <div>
        <CommonHeader />
        <h2>My Canvas Spaces</h2>
        {spaceTiles()}
        {load_more_dingus()}
      </div>
    );
  }

});

export default MySpaces;
