# History

---

## 1.0.0

- feature: silent for notification https://github.com/ant-tool/atool-build/pull/303

## 0.11.1

- enhancement: throw a message when webpack entry is empty

## 0.11.0

- feat: friendly error https://github.com/ant-tool/atool-build/pull/271
- fix: lint error https://github.com/ant-tool/atool-build/pull/272

## 0.10.1

- `revert`: 回滚 svg-sprite-loader
- `test`: 补充用例 svg 和 common

## 0.10.0

- `breaking`: 在 watch 模式下关闭 UglifyJsPlugin 和 DedupePlugin ，如果开启则会引起调试时不可预测的诡异问题。[#265](https://github.com/ant-tool/atool-build/issues/265)
- `breaking`: 使用 url-loader 来处理 `eot` 字体文件（之前是 file-loader），并新增相关用例。https://github.com/ant-tool/atool-build/pull/266 
- `breaking`: 不再支持 node@6 以下，官方不再检查相关兼容性 https://github.com/ant-tool/atool-build/commit/5ccfca937c6353419ee1634666760714151ca8e2 
- `feat`: 新增 svg-sprite-loader 来处理 svg sprite 需求，应用规则为 `*.icon.svg`
- `feat`: 新增 case-sensitive-paths-webpack-plugin 避免在不同 os 平台下对 case 大小写支持问题  https://github.com/ant-tool/atool-build/pull/251
- `feat`: 新增 denpendices.js 导出 atool-build 内置的依赖，诸如: ExtractTextPlugin https://github.com/ant-tool/atool-build/pull/264
- `deps`: 升级所有 atool-build 内置依赖（包含 webpack 升级至 1.15.0 - 1 分支中最新版本）并逐个过了相关用例 https://github.com/ant-tool/atool-build/pull/263
- `fix`: 修复 ts 用例 https://github.com/ant-tool/atool-build/commit/83cccdaa9bdcf928c2ac712b5bceae6a328d05e5
- `test`: 新增 autoprefix 相关用例 https://github.com/ant-tool/atool-build/pull/267

## 0.9.0

- upgrade typescript to 2. Ref. #221

## 0.8.1

- fix: css minimize bug with postcss plugin autoprefix and postcss-loader not found. Ref. #212

## 0.8.0

- enhance autoprefix for mobile. Ref. #190

## 0.7.17

- support import less by transformLess, Ref. [pr](https://github.com/ant-tool/atool-build/pull/188)

## 0.7.16

- adding ".json" to the extensions under resolve
- fix cwd
- upgrade babel-* version

## 0.7.15

- enhancement theme

## 0.7.14

- add cacheDirectory, Close https://github.com/ant-design/antd-init/issues/78
- support theme config, Close #176

## 0.7.13

- fix: args.config is absolute path
- fix: test error

## 0.7.6

- compatibility: 0.7.4 before about babelQuery

## 0.7.5

- support: typescript
- fix: process exit when watch

## 0.7.4

- fix: when build is done but process does not exit, Close #165

## 0.7.3

- support: .web.js

## 0.7.2

- fix: should check package.json before require it

## 0.7.1

- fix class inherit problem in IE9 and IE10, #126, #148
- remove typecheck plugin, #149

## 0.7.0

- add lib/transformLess

## 0.6.0

- 构建日志不输出 uglifyjs 的 warning 信息，#50
- 修改 babel 和 UglifyJsPluginConfig 配置更简单，直接通过 `webpackConfig.babel` 调用，#58
- js 里 require 的 html 文件会被复制到输出目录，#53
- 通过匹配 `*.module.css` 支持 `css-modules`，一种更好的 css 组织方式
- 添加 NoErrorsPlugin 插件，构建出错时不生成文件
- 支持 rucksack，详见 http://simplaio.github.io/rucksack/
- 支持 webpackConfig 处理了 i18n 后是数组的场景，#98
- watch 模式下精简日志信息，#86
- 支持 decorator，#65

## 0.5.0

采用 postcss-loader

解决 map.json bug

## 0.4.3

jsx 全部转换

## 0.4.0

更新 webpack 相关依赖

## 0.3.0

支持 less 变量

## 0.2.0

react 不 external 了

## 0.1.0

初始版本

