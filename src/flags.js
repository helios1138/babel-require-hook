let flags = {};

try {
  eval('(function* () {})()');
  flags.generatorSupport = true;
}
catch (e) {
  flags.generatorSupport = false;
}

export {flags};
