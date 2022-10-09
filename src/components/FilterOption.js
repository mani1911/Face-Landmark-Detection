import React from "react";

const FilterOption = ({ name, clickHandler }) => {
  return (
    <div
      onClick={(e) => {
        clickHandler(e);
      }}
    >
      {name}
    </div>
  );
};

export default FilterOption;
