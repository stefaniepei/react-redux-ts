'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');

const plugins = [
  //文件头部指定的注释信息
  new webpack.BannerPlugin('---------- Author: stefaniepei Email: stefaniepei@icloud.com ----------')
];
module.exports = {
  debug: true,
  entry: {//指定打包的入口文件，每有一个键值对，就是一个入口文件
    'main': path.join(__dirname, '../src/main.js')
  },
  output: {//配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，filename里面的 [name] 会由entry中的键（这里是entry1和entry2）替换
    path: path.join(__dirname, '../dist/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {//定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。比如这里定义了凡是 .js 结尾的文件都是用 babel-loader 做处理，而 .jsx 结尾的文件会先经过 jsx-loader 处理，然后经过 babel-loader 处理。当然这些loader也需要通过 npm install 安装
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          "presets": ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  resolve: {//定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
    extensions: ["", ".js", ".jsx", ".less", ".css"]
  },
  plugins: plugins//这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js
};
