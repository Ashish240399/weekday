import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { colourOptions } from './docs/data';

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ data }) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      //   defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={data}
    />
  );
}
