'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseSensitivePathsPlugin = exports.ExtractTextPlugin = undefined;

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ExtractTextPlugin = _extractTextWebpackPlugin2.default;
exports.CaseSensitivePathsPlugin = _caseSensitivePathsWebpackPlugin2.default;