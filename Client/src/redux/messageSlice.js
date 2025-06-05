import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  loading: false,
  success: false,
  searchText: "",
  messages: [
    {
      messageDate: "",
      messageFor: "",
      messageSubject: "",
      messageSender: "",
      messageBody: "",
    },
  ],
  message: {
    messageDate: "",
    messageFor: "",
    messageSubject: "",
    messageSender: "",
    messageBody: "",
  },
};

export const messageList = createAsyncThunk("message/list", async (email) => {
  // console.log("redux messageList", email)
  const response = await messageService.messageList(email);
  // console.log("redux messageList response", response)
  return response.data;
});

export const addMessage = createAsyncThunk("message/add", async (data) => {
  const {
    messageDate,
    messageFor,
    messageSubject,
    messageSender,
    messageBody,
  } = data;

  const response = await messageService.addMessage(
    messageDate,
    messageFor,
    messageSubject,
    messageSender,
    messageBody,
  );
  // console.log(response.data);
  return response.data;
});


export const getMessage = createAsyncThunk("messages/getMessage", async (id) => {
  const response = await messageService.getMessage(id);
  // console.log(response.data)
  return response.data;
});

export const deleteMessage = createAsyncThunk("messages/deleteMessage", async (id) => {
  const response = await messageService.deleteMessage(id);
  // console.log(response.data)
  return response.data;
});

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageSearched(state, action) {
      // console.log("messageSearched searchText", action.payload)
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //messages list
      .addCase(messageList.pending, (state, action) => {
        // console.log("messageSlice messageList.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(messageList.fulfilled, (state, action) => {
        // console.log("messageSlice messageList.fulfilled", action.payload);
        // console.log(action.payload.messages);
        state.loading = false;
        state.messages = action.payload.messages;
        state.success = true;
      })
      .addCase(messageList.rejected, (state, action) => {
        // console.log("messageSlice messageList.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      //add message
      .addCase(addMessage.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        console.log(action.payload.message);
        state.loading = false;
        // state.messages = action.payload.messages;
        state.success = true;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })

      // Get one Message
      .addCase(getMessage.pending, (state, action) => {
        // console.log("messageSlice getMessage.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        // console.log("messageSlice getMessage.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(getMessage.rejected, (state, action) => {
        // console.log("messageSlice getMessage.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

       // Delete one Message
       .addCase(deleteMessage.pending, (state, action) => {
        // console.log("messageSlice deleteMessage.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        // console.log("messageSlice deleteMessage.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        // console.log("messageSlice deleteMessage.rejected", action.payload);
        state.loading = false;
        state.success = false;
      });
  },
});

export const { messageSearched } = messageSlice.actions;

export default messageSlice.reducer;