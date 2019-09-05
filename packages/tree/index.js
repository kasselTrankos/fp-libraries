function Leaf(val, ann) {
  return {
    ann: ann,
    val: val,
    toString: () => `Leaf(${val}, ${ann})`,
    map: f => Leaf(val, f(ann)),
    extend: f => Leaf(val, f(Leaf(val, ann))),
    changed: ann,
    reduce: (f, acc) => f(acc, ann),
  };
}
// Branch : Tree val ann -> Tree val ann -> ann -> Tree val ann
function Branch(left, right, ann) {
  return {
    ann: ann,
    left: left,
    right: right,
    toString: () => `Branch(${left}, ${right}, ${ann})`,
    map: f => Branch(left.map(f), right.map(f), f(ann)),
    extend: f => Branch(left.extend(f), right.extend(f), f(Branch(left, right, ann))),
    changed: ann || left.changed || right.changed,
    reduce: (f, acc) => right.reduce(f, left.reduce(f, f(acc, ann))),
  };
}

// Any : Bool -> Any
function Any(bool) {
  return {
    bool: bool,
    concat: a => Any(bool || a.bool),
  };
}
Any.empty = () => Any(false);
const fold = (Monoid, Foldable) =>
  Foldable.reduce((acc, x) => acc.concat(x), Monoid.empty());

const foldMap = (Monoid, f, Foldable) =>
  Foldable.reduce((acc, x) => acc.concat(f(x)), Monoid.empty());

const changed = tree => foldMap(Any, Any, tree).bool;
// fold(Any, tree.map(Any)).bool;
//tree.reduce((acc, x) => acc || x, false);

const l1 = Leaf(1, false);
const l2 = Leaf(2, true);
const l3 = Leaf(3, false);
const l4 = Leaf(4, false);
const l5 = Leaf(5, false);
const b1 = Branch(l1, l2, false);
const b2 = Branch(l3, l4, false);
const b3 = Branch(b2, l5, false);
const b4 = Branch(b2, b1, false);
const b5 = b4.extend(changed);

console.log( b5.toString());