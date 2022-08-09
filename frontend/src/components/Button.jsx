import PropTypes from "prop-types";
const Button = ({ text, color, func }) => {
  return (
    <button
      className="btn-comp"
      style={{ backgroundColor: color }}
      onClick={func}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
};
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  func: PropTypes.func,
};

export default Button;
