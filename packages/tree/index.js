function Leaf(val, ann) {
  return {
    ann: ann,
    val: val,
    toString: () => `Leaf(${val}, ${ann})`,
    map: f => Leaf(val, f(ann)),
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
  };
}

const l1 = Leaf(1, 'wat');
const l2 = Leaf(2, 'yup');
const b1 = Branch(l1, l2, 'nope');


console.log(l1.toString(),
l2.toString(),
b1.toString());