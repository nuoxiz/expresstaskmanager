import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  shouldRerender: false,
  message: "",
  task: {},
};
/**
 * @desc Get all tasks
 * @route GET /api/tasks/
 * @access public
 */
export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getAllTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 * @desc GET a task
 * @route GET /api/tasks/:id
 * @access public
 */
export const getTask = createAsyncThunk(
  "goals/getTask",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTask(token, taskId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 * @desc delete a task
 * @route DELETE /api/tasks/:id
 * @access public
 */
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(token, taskID);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (message === null || message === undefined) {
        message = "An Error occured";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/**
 * @desc Create a task
 * @route POST /api/tasks/
 * @access public
 */
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(token, taskData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * @desc Update a task
 * @route PUT /api/tasks/:id
 * @access public
 */
//NB: createAsyncThunk can only have two parameters
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(token, newData, newData._id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    changeShouldRerender: (state) => {
      state.shouldRerender = !state.shouldRerender;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // When we delete a task from the server, the server return the id of the task we just deleted
        state.tasks = state.tasks.map((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          } else {
            return task;
          }
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
        localStorage.setItem("fullTask", JSON.stringify(state.task));
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, changeShouldRerender } = taskSlice.actions;
export default taskSlice.reducer;
