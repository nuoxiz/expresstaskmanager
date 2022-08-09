import authService from "../features/auth/authService";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
const VerifyPage = () => {
  const { confirmationCode } = useParams();
  authService.verifyUser(confirmationCode);
  return (
    <div className="verify-page">
      <h1>
        Account Verified!
        {"  "}
        <FaCheckCircle />
      </h1>
      <div className="btn-container">
        <button className="go-back-btn">
          <Link to="/login">Go to Login</Link>
        </button>
      </div>
    </div>
  );
};
export default VerifyPage;
