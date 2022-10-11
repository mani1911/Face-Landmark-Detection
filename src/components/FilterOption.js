import React from "react";
import "./components.css";
const FilterOption = ({ name, clickHandler, image }) => {
  return (
    <div
      className="scroll-bar"
      onClick={(e) => {
        clickHandler(e);
        console.log("Clicked", name);
      }}
      id={name}
    >
      <img
        className="rounded-circle filterOption"
        src={image}
        alt={name}
        width="120"
        height="120"
      />
    </div>
  );
};

export default FilterOption;
