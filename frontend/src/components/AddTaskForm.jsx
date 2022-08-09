import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, changeShouldRerender } from "../features/tasks/taskSlice";
import { toast } from "react-toastify";
const AddTaskForm = () => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    dueDateTime: "",
    isImportant: false,
  });
  const { task, description, dueDateTime, isImportant } = formData;
  const dispatch = useDispatch();
  const onType = (e) => {
    if (e.target.name === "checkbox") {
      setFormData({ ...formData, isImportant: e.currentTarget.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitNewTask = (e) => {
    e.preventDefault();
    if (!task) {
      toast.error("Task must hava a name.");
      return;
    }
    const newTask = { task, description, dueDateTime, isImportant };
    dispatch(createTask(newTask));
    setFormData({
      task: "",
      description: "",
      dueDateTime: "",
      isImportant: false,
    });
    dispatch(changeShouldRerender());
    setTimeout(() => {
      dispatch(changeShouldRerender());
    }, 1);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitNewTask}>
        <div className="form-item-container">
          <label htmlFor="task">
            <b>Task</b>
          </label>
          <br />
          <input
            className="input-exclude-checkbox"
            type="text"
            name="task"
            id="task"
            value={task}
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
          Create
        </button>
      </form>
    </div>
  );
};
export default AddTaskForm;

