export const truncateDecimals = (actualValue = 0, decimalPlaces = 2) => {
  const calculatedDecimal = Math.pow(10, decimalPlaces);
  const initialValue = Math.trunc(actualValue * calculatedDecimal) / calculatedDecimal;
  return initialValue.toFixed(decimalPlaces);
};

export const formatCurrency = (actualValue: number) => {
  if (actualValue >= 1e3 || actualValue <= -1e3) {
    const units = ['k', 'M', 'B', 'T'];
    const unit = Math.floor(((actualValue).toFixed(0).length - 1) / 3) * 3;
    const minifiedNumb = parseFloat(`1e${unit}`);
    const num = truncateDecimals(actualValue / minifiedNumb);
    const unitname = units[Math.floor(unit / 3) - 1];
    return `${num}${unitname}`;
  }
  return truncateDecimals(actualValue).toLocaleString();
};
