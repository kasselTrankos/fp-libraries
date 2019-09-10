export const clone = date => new Date(date);
export const midnight = date => new Date(date.setHours(0,0,0,0));
export const daysUntilMonday = value => value.getDay() - (value.getDay() === 0 ? -6 : 1);