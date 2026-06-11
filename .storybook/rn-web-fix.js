export * from '../node_modules/react-native-web/dist/index.js';
export { default } from '../node_modules/react-native-web/dist/index.js';

import * as RNWeb from '../node_modules/react-native-web/dist/index.js';

export const PermissionsAndroid = {
  request: () => Promise.resolve('granted'),
  check: () => Promise.resolve(true),
  RESULTS: { GRANTED: 'granted' },
  PERMISSIONS: {},
  requestMultiple: (permissions) => {
    const results = {};
    permissions.forEach(p => results[p] = 'granted');
    return Promise.resolve(results);
  }
};

export const Platform = {
  ...RNWeb.Platform,
  OS: 'web',
  select: (obj) => obj.web || obj.default,
};
