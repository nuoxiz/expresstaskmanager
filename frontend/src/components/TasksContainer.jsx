import TaskItem from "./TaskItem";

const TasksContainer = ({ tasks, setFullTask, context }) => {
  return (
    <div className="task-container">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          setFullTask={setFullTask}
          context={context}
        />
      ))}
    </div>
  );
};
export default TasksContainer;
