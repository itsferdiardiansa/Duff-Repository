const path = require('path');

const resolve = (dir = '') => {
  return path.resolve(process.cwd(), 'src', dir);
};

module.exports = resolve;
