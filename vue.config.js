'use strict'
const path = require('path')

const mock = require('./mock/index');

function resolve(dir) {
  return path.join(__dirname, dir)
}

//const name = 'test' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {

  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: null
  },
 /*  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      libraryExport: 'default'
    }
    // externals: {
    //   'vue': 'Vue',
    //   'element-ui': 'ELEMENT',
    // },
  }, */
  configureWebpack: (config) => {
    config.devServer = {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      before: app => {},
      /* proxy: {
        '/apis': {
          target: 'https://movie.douban.com/', // target host
          ws: true, // proxy websockets 
          changeOrigin: true, // needed for virtual hosted sites
          pathRewrite: {
            '^/apis': '' // rewrite path
          }
        },
        
      } */
      // proxy: {
      // }, // 设置代理
    };
    mock.api(config.devServer);
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // config
    //   // 插件名 
    //   .plugin('extract-css')
    //   // 修改规则
    //   .tap(args => {
    //     args[0].filename = 'css/styles.css'
    //     args[0].chunkFilename = 'css/[name].css'
    //     return args
    //   })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      );
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('utils', resolve('src/utils'));
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // @是src的别名
        prependData: '@import \'@/assets/styles/common.scss\';'
      }
    },
  },
}