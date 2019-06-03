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

];
const prop = k => o => o[k];
const is = value => prop => el => value === prop(el) ? el.id : false;
var Maybe = function(val) {
  this.__value = val;
};
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
const def = x => typeof x !== 'undefined';
Herachy.prototype.filter = function(f) {
  const filter = this.__value.reduce((accu, current, i, array)  => {
    const parentId = f(current);
    if (parentId) {
      current.children = array.filter(child => child.parent === parentId);
      accu.push(current);
    }
    return accu;
  }, []);
  return Herachy.of(filter);

};
const getHerachy = () => {
  var yt = Herachy.of(users)
    .filter(is('boss')(prop('type')))
    .join();
  console.log('nmnm=>', yt.length, '<== mmfmf');
}
export {getHerachy};