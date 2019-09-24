import {tagged} from 'daggy';
const date = tagged('date', ['value']);

date.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
date.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};

const diff = tagged('diff', ['f']);
diff.prototype.contramap = function(g) {
  return diff((x,y)=> this.f(g(x), g(y)));
}


module.exports = {date, diff};
