# react-redux-ts
脚手架

# react-redux-ts
React V16 + ReactRouter V4 + Redux + TypeScript + HMR

# 特性

- [x] React V16 + ReactRouter V4 + Redux + TypeScript2.7.2 + HMR + Webpack4
- [x] sass模块化
- [x] 支持热更新
- [x] 支持tslint语法检查,提交检查


# 快速开始

## 安装

````bash
$ npm install
$ npm install -g ts-node
$ npm install -g typescript
````

## 客户端启动

````bash
$ npm run start
````

## 运行测试环境

````bash
$ npm run dev
````

## 运行QA环境

````bash
$ npm run qa
````

## 运行生产环境

````bash
$ npm run prod
````

## 文件内关闭lint语法检查

````bash
//tslint:disable-line
/* tslint:disable */ - Disable all rules for the rest of the file
/* tslint:enable */ - Enable all rules for the rest of the file
/* tslint:disable:rule1 rule2 rule3... */ - Disable the listed rules for the rest of the file
/* tslint:enable:rule1 rule2 rule3... */ - Enable the listed rules for the rest of the file
// tslint:disable-next-line - Disables all rules for the following line someCode();
// tslint:disable-line - Disables all rules for the current line
// tslint:disable-next-line:rule1 rule2 rule3... - Disables the listed rules for the next line
/* eslint-disable */
/* eslint-disable no-alert, no-console */
// eslint-disable-line
````
