/* tslint:disable */
import * as path from 'path'

export default {
  // base configuration
  env: process.env.NODE_ENV || 'development',
  pathBase: path.join(__dirname, '..'),
  pathSrc: path.join(__dirname, '../src'),
  outDir: path.join(__dirname, '../dist'),
  assetsDir: path.join(__dirname, '../src/assets/img'),
  port: process.env.PORT || 9004,
  version: '1.0.6',
  compilerVendor: [
    'antd',
    'axios',
    'core-js',
    'history',
    'moment',
    'react',
    'react-dom',
    'react-router-dom',
    'react-loadable',
    'redux',
    'react-redux',
    'react-router-redux',
    'ramda',
  ],
  sourcemaps: false,
  globals: {},
  compilerPublicPath: '/',
}
