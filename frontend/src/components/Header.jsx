import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSignInAlt,
  FaUserAlt,
  FaSignOutAlt,
  FaUser,
  FaDatabase,
} from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <header>
      <div className="logo">
        <Link to="/" title="Home">
          Express Manager
        </Link>
      </div>
      {user ? (
        <div className="right-nav">
          <button className="header-btn">
            <Link to="/dashboard" title="Dashboard">
              <FaDatabase title="dashboard" />
              {"Dashboard"}
            </Link>
          </button>
          <button className="header-btn">
            <Link to="/account" title="Account Details">
              <FaUser title="Account details" />
              Account
            </Link>
          </button>
          <button className="header-btn" onClick={onClick}>
            <Link to="/" title="Homepage">
              <FaSignOutAlt title="Sign out" />
              Sign out
            </Link>
          </button>
        </div>
      ) : (
        <div className="right-nav">
          <button className="header-btn">
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </button>
          <button className="header-btn">
            <Link to="/register">
              <FaUserAlt />
              Register
            </Link>
          </button>
        </div>
      )}
    </header>
  );
};
export default Header;
