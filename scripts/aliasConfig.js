const path = require('path');

const PATH_ALIAS = {
  ROOT: path.resolve(__dirname, '../src'),
};

function getAliasConfig() {
  return {
    '@': PATH_ALIAS.ROOT,
    atoms: `${PATH_ALIAS.ROOT}/components/atoms`,
    molecule: `${PATH_ALIAS.ROOT}/components/molecules`,
    organism: `${PATH_ALIAS.ROOT}/components/organisms`,
    template: `${PATH_ALIAS.ROOT}/components/templates`,
    assets: `${PATH_ALIAS.ROOT}/assets`,
    constants: `${PATH_ALIAS.ROOT}/constants`,
    navigation: `${PATH_ALIAS.ROOT}/navigation`,
    screens: `${PATH_ALIAS.ROOT}/screens`,
    services: `${PATH_ALIAS.ROOT}/serviceManager`,
    store: `${PATH_ALIAS.ROOT}/store`,
    utils: `${PATH_ALIAS.ROOT}/utils`,
  };
}

module.exports = {
  getAliasConfig,
};
