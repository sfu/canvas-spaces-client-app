const default_options = () => {
  var opts = {};
  if (__DEV__) {
    opts = {
      headers: {
        Authorization: __CANVAS_API_TOKEN__
      }
    }
  }
  return opts;
}

const api = {

  //
  // Validates that a space name is unique
  // Note: The API downcases the group name when comparing
  //
  validate_space_name(name, options = default_options()) {
    const url = `/api/v1/canvasspaces/validate/name/${name}`;
    return fetch(url, options)
      .then((res) => res.json())
      .catch((error) => { console.log(error); });
  }

}


module.exports = api;