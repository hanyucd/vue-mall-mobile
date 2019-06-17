// const path = require('path');
// const debug = process.env.NODE_ENV !== 'production';

// vue.config.js
module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // port: 8888, // 服务器临时部署端口
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
};