import React from "react";
import Select from "react-select";

const MultiSelection = ({ name, options, setValue, label }) => {
  return (
    <div className="text-black z-20">
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        styles={{
          color: "black",
          display: "flex",
        }}
        isMulti
        isSearchable={true}
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={name}
        onChange={(e) =>
          setValue({
            type: "SET_FILTER",
            filterName: label,
            filterValue: e.map((el) => el.value),
          })
        }
      />
    </div>
  );
};

export default MultiSelection;
