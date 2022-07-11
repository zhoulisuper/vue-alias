const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
  }),
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // publicPath: '/vueDemo/',
  configureWebpack: {
    output: {
      library: { name: `${name}-[name]`, type: 'umd' },
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
  configureWebpack: (config) => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        console.log(val)
        val.userOptions.inject = 'body'
      }
    })
  },
}
