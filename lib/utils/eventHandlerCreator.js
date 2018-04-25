'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = eventHandlerCreator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function groupToUpperCase(match, group) {
  return group.toUpperCase();
}

function toOnEventName(rawName) {
  return 'on' + rawName.replace(/^(.)/, groupToUpperCase).replace(/_(.)/g, groupToUpperCase);
}

function eventHandlerCreator(rawNameList) {
  var eventPropTypes = {};
  var onEventNameByRawName = {};

  rawNameList.forEach(function (rawName) {
    var onEventName = toOnEventName(rawName);
    eventPropTypes[onEventName] = _propTypes2['default'].func;
    onEventNameByRawName[rawName] = onEventName;
  });

  function registerEvents(event, props, googleMapInstance) {
    var registered = rawNameList.reduce(function (acc, rawName) {
      var onEventName = onEventNameByRawName[rawName];

      if (Object.prototype.hasOwnProperty.call(props, onEventName)) {
        acc.push(event.addListener(googleMapInstance, rawName, props[onEventName]));
      }
      return acc;
    }, []);

    return registered.forEach.bind(registered, event.removeListener, event);
  }

  return {
    eventPropTypes: eventPropTypes,
    registerEvents: registerEvents
  };
}

module.exports = exports['default'];