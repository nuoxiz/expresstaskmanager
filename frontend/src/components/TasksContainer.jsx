import TaskItem from "./TaskItem";

const TasksContainer = ({ tasks}) => {
  return (
    <div className="task-container">
      {tasks.message === null ? (
        <h1>No task...</h1>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
          
          />
        ))
      )}
    </div>
  );
};
export default TasksContainer;
