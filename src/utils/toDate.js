import {tagged} from 'daggy';

const ToDate = tagged('Equivalence', ['f']);
ToDate.prototype.contramap = function (f) {
  return ToDate(
    x => this.f(f(x))
  )
}

module.exports = {ToDate};
