import React from "react";
import Select from "react-select";

const SingleSelection = ({ name, options, setValue, label }) => {
  return (
    <div className="text-black">
      <Select
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        isClearable={true}
        name={name}
        options={options}
        placeholder={name}
        onChange={(e) => {
          if (e) {
            setValue({
              type: "SET_FILTER",
              filterName: label,
              filterValue: e.value,
            });
          } else {
            setValue({
              type: "SET_FILTER",
              filterName: label,
              filterValue: 0,
            });
          }
        }}
      />
    </div>
  );
};

export default SingleSelection;
