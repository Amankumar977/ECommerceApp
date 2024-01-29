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
  ...props
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
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm  ${className}`}
        readOnly={readOnly}
        onChange={handleChanges}
        {...props}
      />
    </div>
  );
};

export default Input;
