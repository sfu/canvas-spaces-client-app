import request from 'superagent';

const default_headers = () => {
  var headers = {
    Accept: 'application/json'
  };
  if (__DEV__) {
    headers['Authorization'] = __CANVAS_API_TOKEN__;
  }
  return headers;
};

const urlbase = '/api/v1/canvasspaces';

const api = {

  //
  // Validates that a space name is unique
  // Note: The API downcases the group name when comparing
  //
  validate_space_name(name, cb, headers = default_headers()) {
    const url = `${urlbase}/validate/name/${name}`;
    request
      .get(url)
      .set(headers)
      .end(function(err, data) {
        cb(data.body);
      });
  },

  //
  // Validates that a SFU Username or Alias is a valid Canvas user
  //
  validate_sfu_username(username, cb, headers = default_headers()) {
    const url = `${urlbase}/validate/user/${username}`;
    request
      .get(url)
      .set(headers)
      .end(function(err, data) {
        cb(data.body);
      });
  },

  //
  // Validates that a SFU Maillist is, well, valid
  //
  validate_maillist(maillist, cb, headers = default_headers()) {
    const url = `${urlbase}/validate/maillist/${maillist}`;
    request
      .get(url)
      .set(headers)
      .end(function(err, data) {
        cb(data.body);
      });
  }
}


module.exports = api;