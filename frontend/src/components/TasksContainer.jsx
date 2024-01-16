import TaskItem from "./TaskItem";

const TasksContainer = ({ tasks, setFullTask, context }) => {
  return (
    <div className="task-container">
      {console.log(typeof tasks)}
      {tasks.message === null ? (
        <h1>No task...</h1>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            setFullTask={setFullTask}
            context={context}
          />
        ))
      )}
    </div>
  );
};
export default TasksContainer;
