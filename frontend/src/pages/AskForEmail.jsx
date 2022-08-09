import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, reset, logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import authService from "../features/auth/authService";
import Spinner from "../components/Spinner";
import TaskCompleted from "../components/TaskCompleted";
const AskForEmail = () => {
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const onType = (e) => {
    setEmail(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your full email address");
    }
    dispatch(getUserByEmail({ email: email }));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user in frontend: " + JSON.stringify(user));
      setIsEmailSend(true);
      authService.sendChangePasswordEmail(user);
      dispatch(logout());
    }
    dispatch(reset());
  }, [isError, message, dispatch, isSuccess]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isEmailSend) {
    return (
      <TaskCompleted
        emailMessage={"An email is send to " + email}
        btnMessage={"Login"}
      />
    );
  }
  return (
    <form className="form">
      <h1>Reset Password</h1>
      <div className="form-item-container">
        <input
          className="login"
          type="email"
          name="email"
          id="email"
          placeholder="Please enter your email..."
          value={email}
          onChange={onType}
        />
      </div>
      <div className="btn-container">
        <button className="go-back-btn" onClick={onClick}>
          Send Email
        </button>
      </div>
    </form>
  );
};
export default AskForEmail;
