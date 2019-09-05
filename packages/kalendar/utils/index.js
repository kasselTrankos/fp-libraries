export const compose = (...args) => x => args.reduce(f => f(x), x); 
export const prop = prop => obj => obj[prop];
export const add = valueA => valueB => valueA + valueB; 
export const less = value => value - 1; 
export const substract = valueA => valueB => valueA - valueB; 
export const lt = valueA => valueB => valueA < valueB;
export const toArray = x =>[x]; 
export const not = value => !value;
export const is = cond => cond.every(Boolean);
