'use strict';

import React from 'react';
import CommonHeader from 'apps/Shared/CommonHeader';
import SpaceTile from 'apps/Shared/SpaceTile';
import LoadMoreDingus from 'apps/Shared/LoadMoreDingus';
import api from 'utils/api';

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
      return this.state.spaces.map((space) => {
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
    };

    return (
      <div>
        <CommonHeader />
        <h2>My Canvas Spaces</h2>
        <div className="SpaceList">
          {spaceTiles()}
        </div>
        {load_more_dingus()}
      </div>
    );
  }

});

export default MySpaces;
