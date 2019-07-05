import {tagged} from 'daggy';
const Equivalence = tagged('Equivalence', ['f'])

// Add a pre-processor for the variables.
Equivalence.prototype.contramap =function (g) {
  return Equivalence(
    (x, y) => this.f(g(x), g(y))
  )
}
module.exports = {Equivalence};