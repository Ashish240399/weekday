import React from "react";
import EasyApplyButton from "./EasyApplyButton";

const JobPostCard = ({ jobDetails }) => {
  return (
    <div className="w-full bg-white text-black shadow-[0_1px_3px_1px_rgba(0,0,0,0.2)] rounded-[25px] p-5 max-h-[550px] overflow-hidden relative">
      <div className="flex gap-3">
        <div className="bg-[#222020] text-white h-[50px] w-[50px] flex items-center justify-center">
          W
        </div>
        <div>
          <p className="text-gray-500 font-semibold tracking-[1.4px] text-[14px]">
            {
              jobDetails.jdUid.split("-")[
                jobDetails.jdUid.split("-").length - 1
              ]
            }
          </p>
          <p>
            {jobDetails.jobRole[0].toUpperCase() +
              jobDetails.jobRole.substring(1)}
          </p>
          <p className="text-[13px] mt-2">
            {jobDetails.location[0].toUpperCase() +
              jobDetails.location.substring(1)}
          </p>
        </div>
      </div>
      <div className="text-gray-500 text-[14px] mt-3">
        <span>Estimated Salary: </span>
        <span>
          {jobDetails.maxJdSalary == null && jobDetails.minJdSalary == null ? (
            "Not Disclosed"
          ) : jobDetails.maxJdSalary && jobDetails.minJdSalary ? (
            <span>
              ${jobDetails.minJdSalary.toString()}k -{" "}
              {jobDetails.maxJdSalary.toString()}k
            </span>
          ) : jobDetails.maxJdSalary == null ? (
            <span>${jobDetails.minJdSalary}k</span>
          ) : (
            <span>${jobDetails.maxJdSalary}k</span>
          )}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-[18px] text-gray-700">About company</p>
        <p>About us</p>
        <p className="text-gray-500 text-[14px]">
          {jobDetails.jobDetailsFromCompany}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full p-5 pt-[150px] bg-gradient-to-t from-white via-white to-[#ffffff0c]">
        <p className="text-center text-blue-700 mb-7">View Job</p>
        <div className="mb-4">
          <p className="text-gray-400 font-[600] tracking-[1px] text-[13px]">
            Minimum Experience
          </p>
          <div className="text-[14px]">2 Years</div>
        </div>
        <EasyApplyButton />
      </div>
    </div>
  );
};

export default JobPostCard;