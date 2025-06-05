import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { getLoan, loanList } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar";

const LoanTasks = () => {
  
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const { loans } = useSelector((state) => state.loan);
   const { loan } = useSelector((state) => ({
     success: state.loan.success,
     loan: state.loan.loan,
   }));
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    console.log("loan", loan);
  }, [loan]);

    useEffect(() => {
      if (id) {
        dispatch(getLoan(id));
      }
    }, []);


  return (
    <div className="ml-72 me-10 ">
      <SideNavbar />
      <h1 className="font-bold text-3xl p-4 ml-96 pl-60">Loan Tasks</h1>

      <div id="accordion-nested-parent" data-accordion="collapse">
        <div
          id="accordion-collapse-body-1"
          className=""
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="p-4 border border-b-0 border-black dark:border-gray-700 dark:bg-white">
          <p className="text-black dark:text-black">
              <span className="font-bold">Loan ID:</span> {loan.id}
              </p>
              <p className="text-black dark:text-black pb-4">
              <span className="font-bold ">Borrower's Name:</span> {loan.lastName}, {loan.firstName}
              </p>
              <button
              onClick={() => navigate(`/loan-details/${loan.id}`)}
              type="button"
              className="text-green-600 mb-10 ml-4 bg-black font-semibold hover:bg-green-600 hover:text-black focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-black dark:hover:bg-green-600 dark:focus:ring-green-600">
                Update This Loan</button>

            {/* <!-- Nested accordion --> */}
            <div id="accordion-nested-collapse" data-accordion="collapse">
              <h2 id="accordion-nested-collapse-heading-1">
                <button
                 onClick={() => setShowDropdown1(!showDropdown1)}
                  type="button"
                  className="flex items-center underline justify-between w-full p-5 font-bold rtl:text-right text-black border border-black focus:ring-4 focus:ring-black dark:focus:ring-black dark:border-black dark:text-black hover:bg-green-600 dark:hover:bg-green-600 gap-3"
                  data-accordion-target="#accordion-nested-collapse-body-1"
                  aria-expanded="false"
                  aria-controls="accordion-nested-collapse-body-1"
                >
                  <span>Loan Details</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>

         {showDropdown1 && <div
            id="accordion-nested-collapse-body-1"
            className=""
            aria-labelledby="accordion-nested-collapse-heading-1"
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              <p className="text-black dark:text-black">
              <span className="font-bold">Loan Submission Date:</span> {new Date(loan.dateSubmitted).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </p>
              <p className="text-black dark:text-black">
              <span className="font-bold text-red-600">Estimated Closing Date:</span> {new Date(loan.estClosingDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </p>
              <p className="text-black dark:text-black">
              <span className="font-bold">Loan Amount:</span> ${loan.amount}
              </p>
              <p className="text-black dark:text-black">
              <span className="font-bold">Loan Type:</span> {loan.type}
              </p>
              <p className="text-black dark:text-black">
              <span className="font-bold">Loan Status:</span> {loan.loanStatus}
              </p>
              <p className="text-black dark:text-black">

              <span className="font-bold">Actual Closing Date:</span> {loan.closingDate === null ?  "" : new Date(loan.estClosingDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </p>
            </div>
          </div>}

              <h2 id="accordion-nested-collapse-heading-2">
                <button
                onClick={() => setShowDropdown2(!showDropdown2)}
                  type="button"
                  className="flex items-center underline justify-between w-full p-5 font-bold rtl:text-right text-black border border-black focus:ring-4 focus:ring-black dark:focus:ring-black dark:border-black dark:text-black hover:bg-green-600 dark:hover:bg-green-600 gap-3"
                  data-accordion-target="#accordion-nested-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-nested-collapse-body-2"
                >
                  <span>Tasks</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              {showDropdown2 && <div
                id="accordion-nested-collapse-body-2"
                className=""
                aria-labelledby="accordion-nested-collapse-heading-2"
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 ">
                 {loan.tasks.map((task, index) => (
              <div key={index} className="grid gap-6 mb-6 md:grid-cols-4">
              <div>
                <p>{task.taskName}</p>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-black font-bold  mb-2"
                >
                  Start Date:
                </label>
               <p>{new Date(task.startDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}</p>
              </div>
              <div>
                <label
                  htmlFor="completed"
                  className="block text-black font-bold  mb-2"
                >
                  Completed:
                </label>
             <p>{task.completed === null ? "" : new Date(task.completed).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}</p>
              </div>
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-black font-bold mb-2"
                >
                  Assigned To:
                </label>
            <p>{task.assignedTo}</p>
              </div>
            </div>
                 ))}
                </div>
              </div> }

              <h2 id="accordion-nested-collapse-heading-3">
                <button
                onClick={() => setShowDropdown3(!showDropdown3)}
                  type="button"
                  className="flex items-center underline justify-between w-full p-5 font-bold rtl:text-right text-black border border-black focus:ring-4 focus:ring-black dark:focus:ring-black dark:border-black dark:text-black hover:bg-green-600 dark:hover:bg-green-600 gap-3"
                  data-accordion-target="#accordion-nested-collapse-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-nested-collapse-body-3"
                >
                  <span>Loan Notes</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              {showDropdown3 && 
              <div
                id="accordion-nested-collapse-body-3"
                className=""
                aria-labelledby="accordion-nested-collapse-heading-3"
              >
                <div className="p-5 border border-black dark:border-black">
                  <p className="mb-2 text-black dark:text-black">
                    {loan.notes}
                  </p>
                
                </div>
              </div>}
              <p className="mb-2 mt-4 text-black dark:text-black">
             <span className="text-black font-bold">Loan Manager:</span> {loan.loanManager.firstName} {loan.loanManager.lastName} <span className="text-black font-bold">Email:</span> {loan.loanManager.email}
            </p>
            <p className="mb-2 text-black dark:text-black">
            <span className="text-black font-bold">Loan Officer:</span> {loan.loanOfficer.firstName} {loan.loanOfficer.lastName} <span className="text-black font-bold">Email:</span> {loan.loanOfficer.email}
            </p>
            <p className="mb-2 text-black dark:text-black">
            <span className="text-black font-bold">Loan Processor:</span> {loan.loanProcessor.firstName} {loan.loanProcessor.lastName} <span className="text-black font-bold">Email:</span> {loan.loanProcessor.email}
            </p>
            <p className="mb-2 text-black dark:text-black">
            <span className="text-black font-bold">Loan Underwriter:</span> {loan.loanUnderwriter.firstName} {loan.loanUnderwriter.lastName} <span className="text-black font-bold">Email:</span> {loan.loanUnderwriter.email}
            </p>
            </div> 
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoanTasks;
