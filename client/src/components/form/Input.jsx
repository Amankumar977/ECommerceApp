import React from "react";

const Input = ({
  type,
  name,
  id,
  autoComplete,
  required,
  value,
  className,
  readOnly,
  handleChange, // Corrected: Use "handleChange" instead of "onChange"
}) => {
  const handleChanges = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        required={required}
        value={value}
        className={className}
        readOnly={readOnly}
        onChange={handleChanges}
      />
    </div>
  );
};

export default Input;
