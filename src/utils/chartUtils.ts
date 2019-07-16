export const generateTicks = (values: number[], defaultSize = 8, minZero = false) => {
  if (!values.length) {
    return [];
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const difference = (max - min);
  const minRangeValue = difference / (defaultSize - 2);
  let ticks: number[] = [];
  for (let i = 0; i <= (defaultSize - 2); i ++) {
    const tickValue = (minRangeValue * i) + min;
    ticks.push(parseFloat(tickValue.toFixed(4)));
  }
  ticks = [
    minZero ? 0 : min - minRangeValue,
    ...ticks, max + minRangeValue,
  ];
  return ticks;
};

// export const generateTicksTwoYs = (values, count = DEFAULT_TICK_COUNT, base = 10, increaseMaxValue = 0) => {
//   if (values.length <= 0) return [];
//   const size = count;
//   const maxValue = parseFloat(max(values).toFixed(4)) + increaseMaxValue;
//   const averageValue = Math.ceil(maxValue / base) * base / (size - 2);
//   let ticks = [];
//   for (let i = 0; i < size; i++) {
//     const value = (Math.floor(averageValue / base) * base) * i;
//     ticks = [...ticks, value];
//   }
//   return ticks;
// };
