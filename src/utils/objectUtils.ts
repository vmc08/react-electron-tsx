export const hasValidObjectValues = (obj: { [key: string]: any }): boolean => {
  return Object.keys(obj).some((key) => obj[key]);
};
