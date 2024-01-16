import axios from "axios";

const API_URI = "/api/tasks/";

/**
 * @desc HTTP request to get all the tasks
 * @route GET /api/tasks/
 * @access private
 */

const getAllTasks = async (token) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await (
    await axios.get(API_URI, config)
  ).data;
};
/**
 * @desc HTTP request to get all the tasks
 * @route GET /api/tasks/
 * @access private
 */
const getTask = async (token, taskId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URI + taskId.toString(), config);
  return response.data;
};
/**
 * @desc  HTTP request to delete a task
 * @route DELETE /api/tasks/:id
 * @access private
 */
const deleteTask = async (token, taskID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URI + taskID.toString(), config);
  return response.data;
};

/**
 * @desc  HTTP request to create a task
 * @route POST /api/tasks/
 * @access private
 */
const createTask = async (token, taskData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URI, taskData, config);
  return response.data;
};

/**
 * @desc  HTTP request to update a task
 * @route PUT /api/tasks/:id
 * @access private
 */

const updateTask = async (token, newData, taskId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URI + taskId.toString(),
    newData,
    config
  );
  return response.data;
};

const taskService = {
  getAllTasks,
  deleteTask,
  createTask,
  updateTask,
  getTask,
};
export default taskService;
