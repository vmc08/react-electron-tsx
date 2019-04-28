export const hasValidObjectValues = (obj: any): boolean => {
  return Object.keys(obj).some((key) => obj[key]);
};
