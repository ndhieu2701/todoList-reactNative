import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './userSlice';
import taskReducer from "./taskSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer
  },
  middleware:[thunk]
});

export type RootState = ReturnType<typeof store.getState>
export default store
