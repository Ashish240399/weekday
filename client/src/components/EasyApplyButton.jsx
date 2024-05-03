"use client";
import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";

const EasyApplyButton = () => {
  return (
    <div className="bg-[#55efc4] w-full py-3 rounded-lg text-center text-[16px] flex justify-center items-center gap-2 cursor-pointer">
      <AiFillThunderbolt style={{ color: "gold" }} />
      Easy Apply
    </div>
  );
};

export default EasyApplyButton;
