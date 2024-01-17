import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = input;

  // destruct the auth state
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);
  
  if (isLoading) {
    return <Spinner />;
  }





  const onType = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };


  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1>
        <FaUserAlt /> Sign in
      </h1>

      <div className="form-item-container">
        <input
          className="login"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onType}
          placeholder="Email..."
        />
      </div>
      <div className="form-item-container">
        <input
          className="login"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onType}
          placeholder="Password..."
        />
      </div>
      <button type="submit" className="btn submit-btn">
        Sign in
      </button>
      <p>
        Forgot your password? <Link to={"/reset"}>Reset here</Link>
      </p>
    </form>
  );
};
export default Login;
