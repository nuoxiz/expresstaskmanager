import { FaTimes, FaPenAlt, FaBookOpen } from "react-icons/fa";
import {
  deleteTask,
  changeShouldRerender,
  getTask,
} from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
const TaskItem = ({ task, setFullTask, context }) => {
  const fullTask = useContext(context);

  const [showUpdateFormAfterDeletion, setShowUpdateFormAfterDeletion] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = () => {
    setShowUpdateFormAfterDeletion(!showUpdateFormAfterDeletion);
    toast.info(`Deleted Task: ${task.task}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(deleteTask(task._id));
    dispatch(changeShouldRerender());
    setTimeout(() => {
      dispatch(changeShouldRerender());
    }, 10);
  };
  const cropDescription = (text, length) => {
    if (text === undefined) return "No description...";
    if (text.length >= length) {
      return text.substring(0, length - 1) + "...";
    } else {
      return text;
    }
  };
  const formatDate = (text) => {
    if (text === undefined || text === null || text === "")
      return "No specific date specified";
    return text.substring(0, 10) + " " + text.substring(11, 16);
  };
  const croppedDescription = cropDescription(task.description, 100);
  const croppedTitle = cropDescription(task.task, 40);
  const modifiedDate = formatDate(task.dueDateTime);

  return (
    <div
      className={task.isImportant ? "task-item important-task" : "task-item"}
    >
      <div className="task-item-header-container">
        <div className="header-left">
          <b>{croppedTitle}</b>
        </div>
        <div className="header-right">
          <FaTimes className="cross" onClick={onDelete} title="Delete" />
          <FaPenAlt
            className="edit-btn"
            title="Edit"
            onClick={() => {
              setFullTask({
                ...fullTask,
                _id: task._id,
                task: task.task,
                dueDateTime: modifiedDate,
                description: task.description,
                isImportant: task.isImportant,
              });

              dispatch(getTask(task._id));
              navigate("/updateTask");
            }}
          />
          <FaBookOpen
            className="open-btn"
            title="Expand"
            onClick={() => {
              setFullTask({
                ...fullTask,
                task: task.task,
                dueDateTime: modifiedDate,
                description: task.description,
                isImportant: task.isImportant,
              });

              dispatch(getTask(task._id));
              navigate("/expandTask");
            }}
          />
        </div>
      </div>
      <div className="content-container">
        <b className="task-subtitle">Due:</b>

        <p className="date">{modifiedDate}</p>
      </div>
      <div className="content-container">
        <b className="task-subtitle desc">Description:</b>
        <p className="description">
          {croppedDescription ? croppedDescription : "No Description..."}
        </p>
      </div>
    </div>
  );
};
export default TaskItem;
