import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  loading: false,
  users: [
    {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      roles: [],
      avatar: "",
      contactNumber: "",
    },
  ],
  user: [
    {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      roles: [],
      avatar: "",
      contactNumber: "",
    },
  ],
};

export const usersList = createAsyncThunk("users/list", async () => {
  const response = await usersService.usersList();
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //users
      .addCase(usersList.pending, (state, action) => {
        console.log("usersSlice usersList.pending", action.payload);
        state.loading = true;
      })
      .addCase(usersList.fulfilled, (state, action) => {
        console.log("usersSlice usersList.fulfilled", action.payload);
        state.loading = false;
        state.isLoggedIn = true;
        state.users = action.payload.users;
      })
      .addCase(usersList.rejected, (state, action) => {
        console.log("usersSlice usersList.rejected", action.payload);
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
