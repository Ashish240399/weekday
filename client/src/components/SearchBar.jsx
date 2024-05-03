import React from "react";

const SearchBar = ({ setValue, value, name, label }) => {
  return (
    <div>
      <input
        className="border border-gray-300 rounded-[4px] w-full h-[38px] px-3 focus:outline-none focus:ring-[1.5px] focus:ring-[#1976d2] text-black"
        value={value}
        onChange={(e) =>
          setValue({
            type: "SET_FILTER",
            filterName: label,
            filterValue: e.target.value,
          })
        }
        placeholder={name}
        type="text"
        name=""
        id=""
      />
    </div>
  );
};

export default SearchBar;
