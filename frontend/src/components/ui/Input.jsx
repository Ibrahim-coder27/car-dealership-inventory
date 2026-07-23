import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    id,
    type = "text",
    placeholder = "",
    className = "",
    ...props
  },
  ref
) {
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      className={`
        w-full
        rounded-md
        border
        px-3
        py-2
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
      {...props}
    />
  );
});

export default Input;