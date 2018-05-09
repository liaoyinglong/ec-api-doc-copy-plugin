const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { name, version } = require('./package.json');
// const banner = `
//   ${name}.js v${version}
//   (c) 2018 - 2018 liaoyinglong

// `;
const banner = `
// ==UserScript==
// @name         ${name}
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  only support chrome
// @author       liaoyinglong
// @match        http://192.168.9.105:8888/*
// ==/UserScript==

/* jshint ignore:start */

`;
const baseConfig = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      raw: true,
      entryOnly: true
    })
  ]
};

module.exports = (env, argv) => {
  const plugins = [
    ...baseConfig.plugins,
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ];
  return [
    {
      ...baseConfig,
      output: {
        path: resolve(__dirname, './dist'),
        filename: `${name}.min.js`
      },
      optimization: {
        minimize: false
      },
      plugins
    },
    {
      ...baseConfig,
      output: {
        path: resolve(__dirname, './dist'),
        filename: `${name}.js`
      },
      optimization: {
        minimize: false
      }
    }
  ];
};
