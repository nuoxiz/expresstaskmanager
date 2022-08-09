import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
const PageNotFound = () => {
  const mainMessage = "404 Page Not Found";
  const emailMessage =
    "This is a completely custom 404 error page. It seems that page you are looking for does not or no longer exists.";
  const btnMessage = "Homepage";
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1>
        {mainMessage} <FaExclamationCircle />
      </h1>
      <p style={{ textAlign: "center" }}>{emailMessage && emailMessage}</p>

      <div className="btn-container">
        <button className="go-back-btn" onClick={onClick}>
          {btnMessage}
        </button>
      </div>
    </div>
  );
};
export default PageNotFound;
