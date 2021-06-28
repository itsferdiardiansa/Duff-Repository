const path = require('path');
const resolve = require('../build/resolve');

module.exports = {
  '@': resolve(),
  __mock__: path.resolve(process.cwd(), '__mocks__'),
  '@dummy': path.resolve(process.cwd(), '.dummy'),
  '@data': path.resolve(process.cwd(), '.data'),
  '@common': resolve('components/commons'),
  '@base': resolve('components/fragments/@Base'),
  '@fragment': resolve('components/fragments'),
  '@layout': resolve('layouts'),
  '@mixin': resolve('mixins'),
  '@context': resolve('contexts'),
  '@constant': resolve('constants'),
  '@directive': resolve('directives'),
  '@page': resolve('pages'),
  '@route': resolve('routes'),
  '@store': resolve('store'),
  '@lib': resolve('libs'),
  '@util': resolve('utils'),
  '@plugin': resolve('plugins'),
  '@asset': resolve('assets'),
  '@icon': resolve('assets/icons'),
  '@style': resolve('styles'),
  '@service': resolve('services'),
};
