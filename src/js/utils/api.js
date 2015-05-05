import request from 'superagent';

const default_headers = () => {
  var headers = {
    Accept: 'application/json'
  };
  if (__DEV__) {
    headers['Authorization'] = __CANVAS_API_TOKEN__;
  }
  if (!__DEV__) {
    headers['X-CSRF-Token'] = $.cookie('_csrf_token');
  }
  return headers;
};

const urlbase = '/api/v1/canvasspaces';

const api = {

  validate_field(field, value, cb, headers = default_headers()) {
    const validation_url = `${urlbase}/validate/${field}/${value}`
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
        cb(response)
      });
  },

  get_spaces(cb, headers = default_headers()) {
    request
      .get(`${urlbase}/groups`)
      .set(headers)
      .end((err, response) => {
        cb(response.body);
      });
  }
}


module.exports = api;