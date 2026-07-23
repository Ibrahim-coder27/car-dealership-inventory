function Card({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-md rounded-lg bg-white p-8 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;