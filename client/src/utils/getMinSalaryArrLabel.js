export const getMinSalaryArrLabel = (val) => {
  let minSalaryArr = [{ value: 0, label: 0 + "K" }];
  for (let i = 1; i <= val; i = i + 4) {
    minSalaryArr.push({ value: i * 10, label: i * 10 + "K" });
  }
  return minSalaryArr;
};
