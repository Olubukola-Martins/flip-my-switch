import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://688f6662f21ab1769f890f6f.mockapi.io/switch/signin';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  useBiometrics: boolean;
  currentAccount: number;
  savingsAccount: number;
}

interface UserState {
  user: User | null;
  isNewUser: boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  isNewUser: false,
  loading: false,
};

export const checkUser = createAsyncThunk<User | undefined, string>(
  'user/checkUser',
  async (username) => {
    console.log('Checking user:', username);
    const res = await axios.get(`${API_URL}?username=${username}`);
    console.log('User response:', res);
    console.log('User response data:', res.data);
    return res.data[0]; 
  }
);

export const createUser = createAsyncThunk<User, {
  name: string;
  username: string;
  password: string;
  useBiometrics?: boolean;
}>(
  'user/createUser',
  async ({ name, username, password, useBiometrics = false }) => {
    const newUser = {
      name,
      username,
      password,
      useBiometrics,
      currentAccount: 700000,
      savingsAccount: 2500000,
    };
    const res = await axios.post(API_URL, newUser);
    return res.data;
  }
);

export const toggleBiometrics = createAsyncThunk<User, {
  userId: string;
  useBiometrics: boolean;
}>(
  'user/toggleBiometrics',
  async ({ userId, useBiometrics }) => {
    const res = await axios.put(`${API_URL}/${userId}`, { useBiometrics });
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
        state.user = action.payload ?? null;
        state.isNewUser = action.payload === undefined;
        state.loading = false;
      })
      .addCase(checkUser.rejected, (state, action) => {
        console.error('Check user failed:', action.payload);
        state.loading = false;
        state.user = null;
        state.isNewUser = true; // fallback: assume not new if unknown error
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isNewUser = false;
      })
      .addCase(toggleBiometrics.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});


// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
//         state.user = action.payload ?? null;
//         state.isNewUser = !action.payload;
//         state.loading = false;
//       })
//       .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.user = action.payload;
//         state.isNewUser = false;
//       })
//       .addCase(toggleBiometrics.fulfilled, (state, action: PayloadAction<User>) => {
//         state.user = action.payload;
//       });
//   },
// });

export default userSlice.reducer;
