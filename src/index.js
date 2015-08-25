require('babel-core/polyfill');

import fs from 'fs';
import {compile} from './compile';
import './register-yield-handlers';

let options = { ignore: /node_modules/ };

require.extensions['.js'] = (m, filename) => {
  if (options.ignore.test(filename)) {
    m._compile(fs.readFileSync(filename).toString(), filename);
  }
  else {
    m._compile(compile(filename), filename);
  }
};

export default function (overrideOptions) {
  Object.assign(options, overrideOptions);
}
