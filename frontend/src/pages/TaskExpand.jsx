import { useSelector } from "react-redux";
const TaskExpand = () => {
  const { task } = useSelector((state) => state.task);
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
  return (
    <div className="full-task">
      {console.log("TaskExpand openned")}
      <h1>{task.task ? task.task : "No Task Name..."}</h1>
      <div className="text">
        <b>Due:</b>
        <p>
          {task.dueDateTime
            ? modifyDate(task.dueDateTime)
            : "No Date Specified..."}
        </p>
        <b>Description:</b>
        <p>{task.description ? task.description : "No Description..."}</p>
      </div>
    </div>
  );
};
export default TaskExpand;
