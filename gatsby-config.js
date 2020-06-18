const { generateConfig } = require('gatsby-plugin-ts-config');
const { resolve } = require('path');

module.exports = generateConfig({
  configDir: resolve(__dirname, 'gatsby'),
  babel: true
});
