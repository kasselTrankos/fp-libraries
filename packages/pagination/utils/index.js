import { Left, Right } from "sanctuary";

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x); 
export const add = valueA => valueB => valueA + valueB; 
export const less = value => value - 1; 
export const not = value => !value;
export const toArray = x =>[x]; 
export const is = cond => cond.every(Boolean);
export const prop = prop => obj => obj[prop];
export const substract = valueA => valueB => valueA - valueB; 
export const lt = valueA => valueB => valueA < valueB;
export const getRighOrLeft = cond => cond ? Left : Right;