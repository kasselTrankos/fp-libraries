export const compose = (...fncs) => x => fncs.reduce((acc, f) => f(acc), x); 
export const invert = value => value * - 1;
export const prop = prop => obj => obj[prop];
export const add = valueA => valueB => valueA + valueB; 
export const lt = valueA => valueB => valueA < valueB;
export const toArray = x =>[x]; 
export const not = value => !value;
export const is = cond => cond.every(Boolean);

