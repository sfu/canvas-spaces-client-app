'use strict';

import alt from '../alt';
import api from 'utils/api';

class SpaceActions {
  updateSpaces(spaces, links) {
    this.dispatch({spaces, links});
  }

  fetchSpaces(next_link) {
    this.dispatch();

    if (!next_link) {
      // initial load
      api.get_spaces_for_user('self', (spaces, links) => {
        this.actions.updateSpaces(spaces, links);
      });
    } else {
      // load next pages
      api.load_url(next_link, (spaces, links) => {
        this.actions.updateSpaces(spaces, links);
      });
    }
  }

  updateSpace(space, cb) {
    api.update_space(space, (err, newspace) => {
      if (err) {
        this.actions.spacesFailed(err);
      } else {
        this.dispatch(newspace);
      }
      if (cb) {
        cb();
      }
    });
  }

  deleteSpace(space, cb) {
    api.delete_space(space, (err, response) => {
      if (err) {
        this.actions.spacesFailed(err);
      } else {
        this.dispatch(space.id);
        console.log(response);
      }
      if (cb) {
        cb();
      }
    });
  }

  spacesFailed(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(SpaceActions);
