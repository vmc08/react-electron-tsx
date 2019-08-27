export const dedup = (arraySource: any[]) => {
  const uniqueArray = arraySource.filter((item, index) => {
    return index === arraySource.findIndex((obj) => {
      return JSON.stringify(obj) === JSON.stringify(item);
    });
  });
  return uniqueArray;
};

export const mergeObjectArrayValues = (objectSource: any) => {
  const objectKeys = Object.keys(objectSource);
  let mergedResult: any = [];
  objectKeys.forEach((key) => {
    if (key === '__typename') {
      return;
    }
    // replace value key with parent key name
    const reMappedValues = objectSource[key].map(({ label, value }: any) => ({
      label,
      [key]: value,
    }));
    if (mergedResult.length) {
      mergedResult = mergedResult.map((item: any) => ({
        ...item,
        ...reMappedValues.find((innerItem: any) => innerItem.label === item.label),
      }));
    } else {
      mergedResult = reMappedValues;
    }
  });
  return mergedResult;
};
