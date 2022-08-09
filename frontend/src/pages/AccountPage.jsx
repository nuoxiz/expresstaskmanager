import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authService from "../features/auth/authService";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const AccountPage = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onReset = () => {
    if (
      window.confirm("You will be logged out. Click 'Ok' to continue.") === true
    ) {
      toast.info("An email is send to " + user.email);
      authService.sendChangePasswordEmail(user);
      navigate("/login");
      dispatch(logout());
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="account-page">
      <h1>Account Details</h1>
      <div className="detail-container">
        <b>Name:</b>
        <p>{user.name}</p>
      </div>
      <div className="detail-container">
        <b>Email:</b>

        <p>{user.email}</p>
      </div>
      <div className="detail-container">
        <button className="go-back-btn" onClick={onReset}>
          Reset Password
        </button>
      </div>
    </div>
  );
};
export default AccountPage;
