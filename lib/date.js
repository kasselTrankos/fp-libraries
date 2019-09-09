import {tagged} from 'daggy';
import {contramap} from 'fantasy-land';
const date = tagged('date', ['f']);
//TODO: need to made the IO interfaz pattern


date.prototype[contramap] = date.prototype.contramap = function (g) {
  return date(x => this.f(g(x)));
};

// const add = days => days * 60 * 60 * 24 * 1000;



module.exports = {date};