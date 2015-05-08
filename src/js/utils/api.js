'use strict';

import request from 'superagent';

const default_headers = () => {
  var headers = {
    Accept: 'application/json'
  };
  if (__DEV__) {
    headers.Authorization = __CANVAS_API_TOKEN__;
  }
  if (!__DEV__) {
    headers['X-CSRF-Token'] = $.cookie('_csrf_token');
  }
  return headers;
};

// taken from superagent:
// /lib/node/utils.js
const parse_link_header = (response) => {
  if (!response.header.link) {
    return null;
  }
  return response.header.link.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

const urlbase = '/api/v1/canvasspaces';

const api = {

  validate_field(field, value, cb, headers = default_headers()) {
    const validation_url = `${urlbase}/validate/${field}/${value}`;
    request
      .get(validation_url)
      .set(headers)
      .end((err, response) => {
        cb(response.body);
      });
  },

  create_space(data, cb, headers = default_headers()) {
    request
      .post(`${urlbase}/groups`)
      .set(headers)
      .send(data)
      .end((err, response) => {
        cb(response);
      });
  },

  get_spaces(cb, headers = default_headers()) {
    request
      .get(`${urlbase}/groups`)
      .set(headers)
      .end((err, response) => {
        cb(response.body);
      });
  },

  get_spaces_for_user(user_id, cb, per_page = 10, headers = default_headers()) {
    request
      .get(`${urlbase}/users/self/groups`)
      .query({ per_page })
      .set(headers)
      .end((err, response) => {
        const {body} = response;
        const links = parse_link_header(response);
        cb(body, links);
      });
  },

  load_url(url, cb, headers = default_headers()) {
    request
      .get(url)
      .set(headers)
      .end((err, response) => {
        const {body} = response;
        const links = parse_link_header(response);
        cb(body, links);
      });
  }


};


module.exports = api;
