import Promise from 'bluebird';

Promise.coroutine.addYieldHandler((value) => {
  if (Array.isArray(value)) {
    return Promise.all(value);
  }
  else if (typeof value === 'object') {
    return Promise.props(value);
  }
  else {
    return Promise.resolve(value);
  }
});
