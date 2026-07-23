function ErrorMessage({ children }) {
  if (!children) return null;

  return (
    <p
      role="alert"
      className="mt-1 text-sm text-red-600"
    >
      {children}
    </p>
  );
}

export default ErrorMessage;