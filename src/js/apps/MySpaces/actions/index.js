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
      }, 3);
    } else {
      // load next pages
      api.load_url(next_link, (spaces, links) => {
        this.actions.updateSpaces(spaces, links);
      });
    }
  }

  spacesFailed(errorMessage) {
    this.dispatch(errorMessage);
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

  }
}

export default alt.createActions(SpaceActions);
