const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireLess(config, env);
  return config;
}
