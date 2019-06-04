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
  return new Herachy.of(filter);

};
const getHerachy = (users = []) => {
  var yt = Herachy.of(users)
    .children(is('high')(prop('type')))
    .join();
}
export {getHerachy};