var users = [
  {id: 1, type: 'boss', name: 'maria'},
  {id: 2, type: 'highest', name: 'laura', parent: 1},
  {id: 3, type: 'highest', name: 'alfonso', parent: 1},
  {id: 4, type: 'highest', name: 'vernonica', parent: 1},
  {id: 5, type: 'high', name: 'pedro', parent: 3},
  {id: 6, type: 'high', name: 'alejandra', parent: 3},
  {id: 7, type: 'high', name: 'alejandra', parent: 1},
  {id: 8, type: 'boss', name: 'aleja'},
  {id: 9, type: 'highest', name: 'elisa', parent: 8},
  {id: 10, type: 'highest', name: 'leonor', parent: 8},
  {id: 11, type: 'normal', name: 'sandra', parent: 7},
  {id: 12, type: 'normal', name: 'raquel', parent: 9},

];
const prop = k => o => o[k];
const is = value => prop => el => value === prop(el) ? el.id : false;
const Herachy = function (val) {
  
  this.__value = val;
};
Herachy.prototype.join = function() {
  return this.__value;
};
Herachy.of = function(val) {
  return new Herachy(val);
};
Herachy.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
};
Herachy.prototype.children = function(f) {
  const filter = this.__value.reduce((accu, current, i, array)  => {
    const parentId = f(current);
    if (parentId) {
      accu.push(...array.filter(child => child.parent === parentId));
    }
    return accu;
  }, []);
  return Herachy.of(filter);

};
const getHerachy = () => {
  var yt = Herachy.of(users)
    .children(is('high')(prop('type')))

    .join();
  console.log('nmnm=>', yt, '<== mmfmf');
}
export {getHerachy};