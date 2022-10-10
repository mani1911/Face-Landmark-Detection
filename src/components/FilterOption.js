import React from "react";

const FilterOption = ({ name, clickHandler, image }) => {
  return (
    <div
      onClick={(e) => {
        clickHandler(e);
        console.log("Clicked", name);
      }}
      id={name}
    >
      <img
        className="rounded-circle"
        src={image}
        alt={name}
        width="80"
        height="80"
      />
    </div>
  );
};

export default FilterOption;
