const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': rootPath,
      '~': rootPath,
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
