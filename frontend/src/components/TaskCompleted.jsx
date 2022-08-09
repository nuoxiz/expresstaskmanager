import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
const TaskCompleted = ({ mainMessage, btnMessage, emailMessage }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1>
        {mainMessage} {"   "}
        <FaCheckCircle />
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
export default TaskCompleted;
