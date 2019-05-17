const path = require('path');


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
          .set('vue$', 'vue/dist/vue.esm.js')
          .set('@', resolve('src'))
          .set('common', resolve('src/common'))
          .set('components', resolve('src/components'));
  },
  /* 更换favicon.ico图标 */
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  productionSourceMap: false,
  devServer: {
    //下面为需要跨域的
   /* proxy: {//配置跨域
      '/mobile': {
        target: 'http://47.98.132.55:8892/',//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
       /!* pathRewrite: {
          '^/mobile': ''//请求的时候使用这个api就可以
        }*!/
      },
    }*/
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
};

