export const cardTypeMap = new Map([
  [1, { enum: 'Appeal', name: 'scorer' }],
  [2, { enum: 'Technique', name: 'buffer' }],
  [3, { enum: 'Support', name: 'supporter' }],
]);

export const skillCategoryTypeMap = new Map([
  [1, { enum: 'Special', name: 'SP' }],
  [2, { enum: 'Active', name: 'A' }],
  [3, { enum: 'Passive', name: 'P' }],
]);

export const cardPropensityMap = new Map([
  [1, { enum: 'Vocal', name: 'vocal' }],
  [2, { enum: 'Dance', name: 'dance' }],
  [3, { enum: 'Visual', name: 'visual' }],
]);
