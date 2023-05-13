import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {User} from './userSlice';

export interface Task {
  _id: string;
  user: User;
  content: string;
  status: string;
  title: string;
}

interface InitState {
  tasks: Task[];
}

const initialState: InitState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<InitState>) => {
      state.tasks = action.payload.tasks;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const updateTasks = state.tasks.filter(
        (task: Task) => task._id !== action.payload,
      );
      state.tasks = updateTasks;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskUpdateIndex = state.tasks.findIndex(
        (task: Task) => task._id === action.payload._id,
      );
      state.tasks[taskUpdateIndex] = action.payload;
    },
    clearTask: () => initialState,
  },
});

export const {setTasks, addTask, deleteTask, updateTask, clearTask} = taskSlice.actions;
export default taskSlice.reducer;
