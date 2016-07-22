var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var config = require('./webpack.base.config');

config.debug = false;
config.plugins = (config.plugins || []).concat([
  // Webpack压缩代码的时候，React官方提供的代码已经是合并的, 可以通过以下插件优化
  new webpack.DefinePlugin({
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("app.css", {
    allChunks: true,
    disable: false
  }),
  //提交公用的js文件到common.js文件中
  new CommonsChunkPlugin('common.js'),
  new webpack.optimize.UglifyJsPlugin({ //压缩JS
    output: {
      comments: false,
    },
    compress: {
      warnings: false
    }
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body',
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true //删除空白符与换行符
    },
  }),
  new webpack.optimize.DedupePlugin(), //用来检测相似的文件或文件中相似的内容并消除冗余
  new webpack.optimize.OccurenceOrderPlugin(), //根据引用频率来排序id的大小，越频繁id越小
  new webpack.optimize.AggressiveMergingPlugin(), //用来优化合并相似的代码段，提取公共部分
  new webpack.optimize.NoErrorsPlugin() //保证编译功能不出错
]);

module.exports = config;
