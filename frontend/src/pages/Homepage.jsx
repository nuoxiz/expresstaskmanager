import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="article-container">
      <div className="article">
        <img src="homepage.webp" alt="" className="homepage-image"/>
      </div>
      <div className="article">
        <h1>Express Task Manager</h1>
        <div className="homepage-link">
          <button className="btn">
            <Link to="/login" title="Login">
              Login
            </Link>
          </button>
          <p>
            Do not have an account?{" "}
            <Link to="/register" title="Register">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
