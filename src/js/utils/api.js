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

  validate_field(field, value, cb, headers = default_headers()) {
    const validation_url = `${urlbase}/validate/${field}/${value}`
    request
      .get(validation_url)
      .set(headers)
      .end((err, response) => {
        cb(response.body);
      });
  },

    request
      .set(headers)
      });
  }
}


module.exports = api;