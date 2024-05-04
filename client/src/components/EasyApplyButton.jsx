"use client";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";

const EasyApplyButton = () => {
  return (
    <div className="bg-[#55efc4] w-full md:py-3 py-2 rounded-lg text-center md:text-[16px] text-[14px] flex justify-center items-center md:gap-2 gap-1 cursor-pointer">
      <AiFillThunderbolt style={{ color: "gold" }} />
      Easy Apply
    </div>
  );
};

export default EasyApplyButton;
