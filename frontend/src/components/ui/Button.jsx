function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full
        rounded-md
        bg-blue-600
        py-2
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;