export function getJobRoleArrLabel(jobRoles) {
  let jobRoleArr = [];
  for (let i = 0; i < jobRoles.length; i++) {
    jobRoleArr.push({
      value: jobRoles[i],
      label: jobRoles[i][0].toUpperCase() + jobRoles[i].substring(1),
    });
  }
  return jobRoleArr;
}
