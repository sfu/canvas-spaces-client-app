var REQUIRE_PLUGINS_PATH = '../../../vendor/js/require_plugins/';

requirejs.config({

  /*
    map: http://requirejs.org/docs/api.html#config-map

    For the given module prefix, instead of loading the
    module with the given ID, substitute a different module ID.
    This sort of capability is really important for larger
    projects which may have two sets of modules that need to use
    two different versions of 'foo', but they still need to
    cooperate with each other.

    There is also support for a "*" map value which means
    "for all modules loaded, use this map config". If there
    is a more specific map config, that one will take
    precedence over the star config.
  */
  map: {
    '*': {
      'underscore': 'lodash',
      'canvas_packages': '../../../vendor/packages',
    },
    'canvas/react': {
      'bower/react/react-with-addons': 'canvas/bower/react/react-with-addons'
    },
  },

  paths: {

    // requirejs plugins
    'text':           REQUIRE_PLUGINS_PATH + 'text',
    'jsx':            REQUIRE_PLUGINS_PATH + 'jsx',
    'JSXTransformer': REQUIRE_PLUGINS_PATH + 'JSXTransformer',


    // app components shortcut
    'components': '../src/js/components',


    // ========================================================================
    // Aliases to frequently-used Canvas packages
    'react': '../../../vendor/packages/react',
    'lodash': '../../../vendor/packages/lodash',
    // ========================================================================

    // ========================================================================
    // Internal, for package providers only:
    'canvas': '../../../vendor/canvas/public/javascripts',
  },

  // options for the jsx transformer plugin
  jsx: {
    harmony: true
  }


});