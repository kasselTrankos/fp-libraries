"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeek = exports.lte = exports.equals = exports.getMonday = exports.addDays = void 0;

var _kalendar = require("./../lib/kalendar");

var _date = require("./../lib/date");

var _utils = require("./../utils");

var _date2 = require("./../utils/date");

var day = function day(date) {
  return {
    value: date,
    concat: function concat(amount) {
      return new Date(new Date(date).setDate(date.getDate() + amount));
    },
    empty: function empty() {
      return new Date(0);
    }
  };
};

var fillDays = function fillDays(length) {
  return function (date) {
    return Array.from({
      length: length
    }, function (_, i) {
      return day(date).concat(i);
    });
  };
};

var monday = (0, _kalendar.kalendar)(function (d) {
  return (0, _utils.compose)(_date2.daysUntilMonday, _utils.invert, day(d).concat)(d);
}).contramap(_date2.midnight).contramap(_date2.clone);
var week = (0, _kalendar.kalendar)(fillDays(7)).contramap(monday.f);

var addDays = function addDays(date) {
  return day(date).concat;
};

exports.addDays = addDays;
var getMonday = monday.f;
exports.getMonday = getMonday;

var equals = function equals(dateA) {
  return function (dateB) {
    return (0, _date.date)(dateA).equals(dateB);
  };
};

exports.equals = equals;

var lte = function lte(dateA) {
  return function (dateB) {
    return (0, _date.date)(dateA).lte(dateB);
  };
};

exports.lte = lte;
var getWeek = week.f; // export const diffDays = dateA => dateB => 

exports.getWeek = getWeek;
//# sourceMappingURL=Kalendar.js.map