import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, reset } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import TaskCompleted from "../components/TaskCompleted";
const ChangePasswordPage = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { isError, isLoading, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    password: "",
    passwordTwo: "",
  });
  const { password, passwordTwo } = formData;
  const onType = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitNewPassword = (e) => {
    e.preventDefault();
    if (!password || !passwordTwo) {
      toast.error("Error: Please all the fields.");
      return;
    }
    if (password !== passwordTwo) {
      toast.error("Error: Passwords do not match.");
      return;
    }

    dispatch(changePassword({ _id: userId, newPassword: password }));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      setIsPasswordChanged(true);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isPasswordChanged) {
    return (
      <TaskCompleted
        mainMessage={"Your password is changed!"}
        btnMessage={"Login"}
      />
    );
  }
  return (
    <form className="form" onSubmit={submitNewPassword}>
      <h1>Please enter your new password</h1>
      <div className="form-item-container">
        <input
          className="register"
          type="password"
          placeholder="Please enter your new password..."
          name="password"
          id="password"
          value={password}
          onChange={onType}
        />
      </div>
      <div className="form-item-container">
        <input
          className="register"
          type="password"
          placeholder="Please re-enter your new password..."
          name="passwordTwo"
          id="passwordTwo"
          value={passwordTwo}
          onChange={onType}
        />
      </div>
      <button type="submit" className="go-back-btn">
        Submit
      </button>
    </form>
  );
};
export default ChangePasswordPage;
