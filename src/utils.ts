export const find = <I>(arr: I[], callback: (item: I) => boolean): I => {
  const item = arr.find(callback);
  if (item !== undefined) return item;
  throw new Error('Array has not contains this item');
};
