import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTask,
  changeShouldRerender,
  reset,
} from "../features/tasks/taskSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect } from "react";
const UpdateTaskForm = () => {
  const localStorageTask = JSON.parse(localStorage.getItem("fullTask"));
  // const { task } = useSelector((state) => state.task);
  // const localStorageTask = task;
  console.log(localStorageTask);
  /**
   * @desc Format date to yyyy-mm-ddTHH:MM
   */
  const modifyDate = (date) => {
    if (date === undefined || date === null || date === "") {
      return "1980-01-01T00:00";
    } else {
      return date.substring(0, 16);
    }
  };
  const { isError, isLoading, message } = useSelector((state) => state.task);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    _id: localStorageTask._id ? localStorageTask._id : "",
    taskName: localStorageTask.task ? localStorageTask.task : "",
    description: localStorageTask.description
      ? localStorageTask.description
      : "",
    dueDateTime: localStorageTask.dueDateTime
      ? modifyDate(localStorageTask.dueDateTime)
      : "",
    isImportant: localStorageTask.isImportant
      ? localStorageTask.isImportant
      : "",
  });
  const { taskName, description, dueDateTime, isImportant } = formData;

  const onType = (e) => {
    if (e.target.name === "checkbox") {
      setFormData({ ...formData, isImportant: e.currentTarget.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  const submitUpdateTask = (e) => {
    e.preventDefault();
    if (!localStorageTask) {
      toast.error("Task must hava a name.");
      return;
    }
    const updatedTask = {
      _id: localStorageTask._id,
      task: taskName,
      description,
      dueDateTime: dueDateTime === "No specific date" ? null : dueDateTime,
      isImportant: isImportant ? isImportant : false,
    };
    dispatch(updateTask(updatedTask));
    // setShowUpdateForm(!showUpdateForm);
    dispatch(changeShouldRerender());
    //call changeShouldRerender twice to ensure that the correct tasks are rendered
    setTimeout(() => {
      dispatch(changeShouldRerender());
    }, 1);
    toast.info(`Updated task: ${updatedTask.task}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/dashboard");
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="form-container">
      <form className="form" onSubmit={submitUpdateTask}>
        <h1>Update Form</h1>
        <div className="form-item-container">
          <label htmlFor="taskName">
            <b>Task</b>
          </label>
          <br />
          <input
            className="input-exclude-checkbox"
            type="text"
            name="taskName"
            id="taskName"
            value={taskName}
            onChange={onType}
          />
        </div>
        <div className="form-item-container">
          <label htmlFor="description">
            <b> Description</b>
          </label>
          <br />
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={onType}
          />
        </div>
        <div className="form-item-container">
          <label htmlFor="dueDateTime">
            <b>Due Date</b>
          </label>
          <br />
          <input
            type="datetime-local"
            className="input-exclude-checkbox"
            name="dueDateTime"
            id="dueDateTime"
            value={dueDateTime}
            onChange={onType}
          />
        </div>
        <div className="form-item-container checkbox">
          <label htmlFor="checkbox">
            <b>Mark as Important?</b>
          </label>

          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={isImportant}
            value={isImportant}
            onChange={onType}
          />
        </div>
        <button type="submit" className="btn submit-btn btn-block">
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateTaskForm;
