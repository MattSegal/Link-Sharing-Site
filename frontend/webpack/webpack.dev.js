const baseConfig = require('./webpack.base.js')

module.exports = {
  ...baseConfig,
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
}
