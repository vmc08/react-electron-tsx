export const dedup = (arraySource: any[]) => {
  const uniqueArray = arraySource.filter((item, index) => {
    return index === arraySource.findIndex((obj) => {
      return JSON.stringify(obj) === JSON.stringify(item);
    });
  });
  return uniqueArray;
};
