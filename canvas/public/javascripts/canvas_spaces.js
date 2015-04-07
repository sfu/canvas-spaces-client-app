// copy into public/javascripts/canvas_spaces.js
require([ 'canvas_spaces' ], function(app) {

  console.log('hello canvas_spaces');

}, function(error) {
  console.warn('CQS loading failed:', error, error.stack);
});

