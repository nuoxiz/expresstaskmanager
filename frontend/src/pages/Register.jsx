import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import TaskCompleted from "../components/TaskCompleted";
const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordTwo: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, passwordTwo } = formData;
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const onType = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onRegisterUser = (e) => {
    e.preventDefault();
    if (password !== passwordTwo) {
      toast.error("The passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      setIsRegistered(true);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isRegistered) {
    return (
      <TaskCompleted
        emailMessage={"An verification email is send to " + email}
        btnMessage={"Login"}
        mainMessage={"Thank you for register!"}
      />
    );
  }
  return (
    <form className="form" onSubmit={onRegisterUser}>
      <h1>
        <FaUserAlt />
        Register
      </h1>
      <div className="form-item-container">
        <input
          className="register"
          type="text"
          placeholder="Please enter your name"
          name="name"
          id="name"
          value={name}
          onChange={onType}
        />
      </div>
      <div className="form-item-container">
        <input
          className="register"
          type="email"
          placeholder="Please enter your email"
          name="email"
          id="email"
          value={email}
          onChange={onType}
        />
      </div>
      <div className="form-item-container">
        <input
          className="register"
          type="password"
          placeholder="Please enter your password"
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
          placeholder="Please enter your password again"
          name="passwordTwo"
          id="passwordTwo"
          value={passwordTwo}
          onChange={onType}
        />
      </div>
      <button type="submit" className="btn submit-btn">
        Register
      </button>
    </form>
  );
};
export default Register;
