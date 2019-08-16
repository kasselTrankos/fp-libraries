export const compose = (fA, fB) => x => fA(fB(x)); 
export const add = valueA => valueB => valueA + valueB; 
export const less = value => value - 1; 
export const not = value => !value;
export const toArray = x =>[x]; 
export const is = cond => cond.every(Boolean);
export const prop = prop => obj => obj[prop];
export const substract = valueA => valueB => valueA - valueB; 
export const lt = valueA => valueB => valueA < valueB;