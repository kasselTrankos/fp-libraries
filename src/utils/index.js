export const value = right => right.value;
export const prop = prop => obj => obj[prop];
export const add = value => value + 1; 
export const less = value => value - 1; 
export const lt = valueA => valueB => valueA < valueB;
export const toArray = x =>[x]; 
export const not = value => !value;
export const is = cond => cond.every(Boolean);