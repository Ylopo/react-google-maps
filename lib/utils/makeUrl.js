"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeUrl;
exports.getUrlObjChangedKeys = getUrlObjChangedKeys;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _url = require("url");

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodashIsequal = require("lodash.isequal");

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

function makeUrl(urlObj) {
  return (0, _url.format)({
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port: urlObj.port,
    pathname: urlObj.pathname,
    query: urlObj.query
  });
}

var urlObjDefinition = {
  // PropTypes for URL generation
  // https://nodejs.org/api/url.html#url_url_format_urlobj
  protocol: _propTypes2["default"].string,
  hostname: _propTypes2["default"].string.isRequired,
  port: _propTypes2["default"].number,
  pathname: _propTypes2["default"].string.isRequired,
  query: _propTypes2["default"].object.isRequired
};

exports.urlObjDefinition = urlObjDefinition;

function getUrlObjChangedKeys(urlObj, nextUrlObj) {
  return Object.keys(urlObjDefinition).filter(function (key) {
    return !(0, _lodashIsequal2["default"])(urlObj[key], nextUrlObj[key]);
  });
}