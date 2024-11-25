const Button = ({ className, value, trigerButton }) => {
  return (
    <button
      type="button"
      className={`${className} text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2`}
      onClick={trigerButton}
    >
      {value}
    </button>
  );
};

export default Button;
