export function getJobTypeArrLabel(jobTypes) {
  let jobTypeArr = [];
  for (let i = 0; i < jobTypes.length; i++) {
    jobTypeArr.push({
      value: jobTypes[i],
      label: jobTypes[i][0].toUpperCase() + jobTypes[i].substring(1),
    });
  }
  return jobTypeArr;
}
