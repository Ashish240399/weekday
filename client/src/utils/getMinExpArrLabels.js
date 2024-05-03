export function getMinExpArrLabel(val) {
  let minExpArr = [];
  for (let i = 1; i <= val; i++) {
    minExpArr.push({ value: i, label: i });
  }
  return minExpArr;
}
