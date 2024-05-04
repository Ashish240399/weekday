export const getMinSalaryArrLabel = (val) => {
  let minSalaryArr = [];
  for (let i = 0; i <= val; i = i + 5) {
    minSalaryArr.push({ value: i, label: i + "K" });
  }
  return minSalaryArr;
};
