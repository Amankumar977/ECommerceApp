import React from "react";

const Label = ({ htmlFor, className, label }) => {
  return (
    <div>
      <label htmlFor={htmlFor} className={className}>
        {label}
      </label>
    </div>
  );
};

export default Label;
