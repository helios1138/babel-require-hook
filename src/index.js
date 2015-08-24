module.exports = function (options) {
  var babel = require('babel-core');
  var fs = require('fs');

  require('babel-core/polyfill');

  function compile(filename) {
    console.log(filename);
    var result = babel.transformFileSync(filename, { optional: ['bluebirdCoroutines'] });
    result = babel.transform(result.code);
    return result.code;
  }

  require.extensions['.js'] = function (m, filename) {
    if (filename.indexOf('node_modules') > -1) {
      m._compile('' + fs.readFileSync(filename), filename);
    }
    else {
      m._compile(compile(filename), filename);
    }
  };
};