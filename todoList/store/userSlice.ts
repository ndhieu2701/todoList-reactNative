import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  picture: string;
}

interface InitState {
  token: string;
  user: User;
  message?: string;
}

const initialState: InitState = {
  token: '',
  user: {
    _id: '',
    email: '',
    username: '',
    password: '',
    picture: '',
  },
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    logout: () => initialState,
  },
});

export const {setUser, updateUser, setMessage, logout} = userSlice.actions;
export default userSlice.reducer;
