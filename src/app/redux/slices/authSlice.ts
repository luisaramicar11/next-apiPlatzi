"use client";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, User } from "../../_interfaces/authInterface";

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Acción asíncrona para iniciar sesión
   export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: {email:string, password:string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", credentials); 
            return response.data
        }catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
   )

// Acción asíncrona para registro
   export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser: {name:string, email:string, password:string, avatar:string}, {rejectWithValue}) => {
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/users", newUser); 
            return response.data
        }catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
   )

// Slice de Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
     .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
     .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
     .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
     })
  }
});

// Exporta las acciones y el reducer
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;