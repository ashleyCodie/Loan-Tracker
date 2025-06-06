import "dotenv/config";
import axios from "axios";
// import { generateFakeLoans } from "./generateFakeLoans.js";

// const seedLoans = generateFakeLoans(1)

const seedLoans = [
  {
    dateSubmitted: new Date("10-16-2024"),
    firstName: "Angel",
    lastName: "Wausnock",
    amount: 460000,
    type: "Purchase",
    loanStatus: "Denied",
    department: "Underwriting",
    loanManager: 
      {
        firstName: "Nico",
        lastName: "Adams",
        email: "Nico.Adams30@yahoo.com",
      }
    ,
    loanOfficer: 
      {
        firstName: "Courtney",
        lastName: "Jenkins",
        email: "Tatyana.Shanahan@yahoo.com",
      }
    ,
    loanProcessor:  
      {
        firstName: "Ashley",
        lastName: "Codie",
        email: "Belle_Oberbrunner@gmail.com",
      }
    ,
    loanUnderwriter:    
      {
        firstName: "Emely",
        lastName: "Kub",
        email: "Dominique_Feil91@yahoo.com",
      }
    ,
    tasks: [
      {
        taskName: "Initial Loan App",
        startDate: new Date("10-16-2024"),
        completed: new Date("10-16-2024"),
        assignedTo: "Processing",
      },
      {
        taskName: "Paystubs",
        startDate: new Date("10-16-2024"),
        completed: new Date("10-16-2024"),
        assignedTo: "Processing",
      },
      {
        taskName: "Bank Statements",
        startDate: new Date("01-25-2025"),
        completed: new Date("01-25-2025"),
        assignedTo: "Underwriting",
      },
      {
        taskName: "Tax Returns",
        startDate: new Date("10-16-2024"),
        completed: new Date("10/20/2024"),
        assignedTo: "Underwriting",
      },
      {
        taskName: "V.O.E.",
        startDate: new Date("02-21-2025"),
        // completed: new Date("02-21-2025"),
        assignedTo: "Closing",
      },
      // {
      //   taskName: "V.O.D.",
      //   startDate: new Date("12-19-2024"),
      //   // completed: new Date("12-22-2025"),
      //   assignedTo: "Closing",
      // },
      // {
      //   taskName: "V.O.R.",
      //   startDate: new Date("02-22-2025"),
      //   // completed: new Date("12-22-2025"),
      //   assignedTo: "Closing",
      // },
      // {
      //   taskName: "Assets",
      //   startDate: new Date("02-19-2025"),
      //   // completed: new Date("12-22-2025"),
      //   assignedTo: "Processing",
      // },
      {
        taskName: "Final App",
        startDate: new Date("01-16-2025"),
        // completed: new Date("01-22-2025"),
        assignedTo: "Closing",
      },
    ],
    estClosingDate: new Date("01-16-2025"),
    // closingDate: new Date("03-01-2025"),
    notes: "Initial loan application on file; ordered tax transcripts; paystubs requested from borrower; Need Copy of 401k statement to use as liquid assets. "
  },
];
console.log("seedLoans", seedLoans);

seedLoans.forEach(async (loan) => {
  const addLoan = await axios.post(`${process.env.SERVER_URL}/loans`, loan);
  console.log("addLoan", addLoan.data);
});