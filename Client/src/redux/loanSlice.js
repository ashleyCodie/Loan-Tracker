import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loanService from "./loanService";

const initialState = {
  loading: false,
  success: false,
  searchText: "",
  loans: [
    {
      dateSubmitted: "2024-04-06T00:00:02.024Z",
      firstName: "",
      lastName: "",
      amount: "",
      type: "Purchase",
      loanStatus: "Submitted",
      department: "Processing",
      loanManager: { firstName: "", lastName: "", email: ""},
      loanOfficer: { firstName: "", lastName: "", email: ""},
      loanProcessor: { firstName: "", lastName: "", email: ""},
      loanUnderwriter: { firstName: "", lastName: "", email: ""},
      tasks: [],
      estClosingDate: "2024-04-06T00:00:02.024Z",
      closingDate: "",
      notes: ""
    },
  ],
  loan:
    {
      dateSubmitted: "2024-04-06T00:00:02.024Z",
      firstName: "",
      lastName: "",
      amount: "",
      type: "Purchase",
      loanStatus: "Submitted",
      department: "Processing",
      loanManager: { firstName: "", lastName: "", email: ""},
      loanOfficer: { firstName: "", lastName: "", email: ""},
      loanProcessor: { firstName: "", lastName: "", email: ""},
      loanUnderwriter: { firstName: "", lastName: "", email: ""},
      tasks: [{
        taskName: "",
        startDate: "2024-04-06T00:00:02.024Z",
        completed: "2024-04-06T00:00:02.024Z",
        assignedTo: "",
      }],
      estClosingDate: "2024-04-06T00:00:02.024Z",
      closingDate: "",
      notes: ""
    },
  
};

export const loanList = createAsyncThunk("loan/list", async (email) => {
  // console.log("redux loanList", email)
  const response = await loanService.loanList(email);
  // console.log("redux loanList response", response)
  return response.data;
});

export const addLoan = createAsyncThunk("loan/add", async (data) => {
  const {
    dateSubmitted,
    firstName,
    lastName,
    amount,
    type,
    loanStatus,
    department,
    loanManager,
    loanOfficer,
    loanProcessor,
    loanUnderwriter,
    tasks,
    estClosingDate,
    closingDate,
    notes,
  } = data;

  const response = await loanService.addLoan(
    dateSubmitted,
    firstName,
    lastName,
    amount,
    type,
    loanStatus,
    department,
    loanManager,
    loanOfficer,
    loanProcessor,
    loanUnderwriter,
    tasks,
    estClosingDate,
    closingDate, 
    notes
  );
  console.log(response.data)
  return response.data;
});


export const updateLoan = createAsyncThunk("loans/update", async ({ id, loan }) => {
  // console.log("loan", loan)
  const response = await loanService.updateLoan(id, loan);
  // console.log(response.data)
  return response.data;
})

export const getLoan = createAsyncThunk("loans/getLoan", async (id) => {
  const response = await loanService.getLoan( id );
  // console.log(response.data)
  return response.data;
})



export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    loanSearched(state, action) {
      // console.log("loanSearched searchText", action.payload)
      state.searchText = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    //loan list
      .addCase(loanList.pending, (state, action) => {
        // console.log("loanSlice loanList.pending", action.payload);
        state.loading = true;
        state.success = false
      })
      .addCase(loanList.fulfilled, (state, action) => {
        // console.log("loanSlice loanList.fulfilled", action.payload);
        console.log(action.payload.loans);
        state.loading = false;
        state.loans = action.payload.loans;
        state.success = true
      })
      .addCase(loanList.rejected, (state, action) => {
        // console.log("loanSlice loanList.rejected", action.payload);
        state.loading = false;
        state.success = false
      })
      
      //add loan
      .addCase(addLoan.pending, (state, action) => {
        state.loading = true;
        state.success = false
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        console.log(action.payload.loan);
        state.loading = false;
        // state.loans = action.payload.loans;
        state.success = true
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.loading = false;
        state.success = false
      })

      //update loan
      .addCase(updateLoan.pending, (state, action) => {
        // console.log("loanSlice updateLoan.pending", action.payload);
        state.loading = true;
        state.success = false
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        // console.log("loanSlice updateLoan.fulfilled", action.payload);
        state.loading = false;
        state.success = true
      })
      .addCase(updateLoan.rejected, (state, action) => {
        // console.log("loanSlice updateLoan.rejected", action.payload);
        state.loading = false;
        state.success = false
      })
      
      // Get one Loan
      .addCase(getLoan.pending, (state, action) => {
        // console.log("loanSlice getLoan.pending", action.payload);
        state.loading = true;
        state.success = false
      })
      .addCase(getLoan.fulfilled, (state, action) => {
        // console.log("loanSlice getLoan.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.loan = action.payload;
        state.success = true
      })
      .addCase(getLoan.rejected, (state, action) => {
        // console.log("loanSlice getLoan.rejected", action.payload);
        state.loading = false;
        state.success = false
      })
  },
});

export const { loanSearched } = loanSlice.actions

export default loanSlice.reducer;