import {tagged} from 'daggy';
import {contramap} from 'fantasy-land';
const kalendar = tagged('kalendar', ['f']);
//TODO: need to made the IO interfaz pattern


kalendar.prototype[contramap] = kalendar.prototype.contramap = function (g) {
  return kalendar(x => this.f(g(x)));
};



module.exports = {kalendar};