// vue.config.js
// const path = require('path');
// const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/goods': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
};