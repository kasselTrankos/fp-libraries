import {tagged} from 'daggy';
import {tz} from './date';
const kalendar = tagged('kalendar', ['value']);

kalendar.prototype.concat = function(that) {
  return kalendar(new Date(this.value.getTime() + that.getTime()));
};
kalendar.empty = function() {
  return new Date(0);
};
kalendar.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
kalendar.prototype.format = function(format) {
  const {value} = this.concat(tz.f(this.value));
  const zero = value => value < 10 ? `0${value}`: value;
  const dayMonthYear = `${zero(value.getDate())}/${zero(value.getMonth() + 1)}/${value.getFullYear()}`;
  const hourMinuteSecond = `${zero(value.getHours())}:${zero(value.getMinutes())}:${zero(value.getSeconds())}`;
  return `${dayMonthYear} ${hourMinuteSecond}`;
};
kalendar.prototype.map = function(f) {
  return kalendar(f(this.value));
};

module.exports = {kalendar};
