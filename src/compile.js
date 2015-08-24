import babel from 'babel-core';

export function compile(filename) {
  let {code} = babel.transformFileSync(filename, { optional: ['bluebirdCoroutines'] });
  return babel.transform(code).code;
}
