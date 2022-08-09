import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, reset } from "../features/tasks/taskSlice";
import Button from "../components/Button";
import AddTaskForm from "../components/AddTaskForm";
import TasksContainer from "../components/TasksContainer";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ setFullTask, context }) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const { tasks, isLoading, isError, message, shouldRerender } = useSelector(
    (state) => state.task
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch(getAllTasks());
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isError, message, dispatch, shouldRerender]);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <div>
      <Button
        text={showAddTaskForm ? "Close" : "Add task"}
        color={showAddTaskForm ? "red" : "green"}
        func={() => setShowAddTaskForm(!showAddTaskForm)}
      />
      {showAddTaskForm && <AddTaskForm />}
      {tasks.length === 0 || tasks === null ? (
        <h1>No Task...</h1>
      ) : (
        <TasksContainer
          tasks={tasks}
          setFullTask={setFullTask}
          context={context}
        />
      )}
    </div>
  );
};
export default Dashboard;
