import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router";
import { loanList } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar"




const UpdateLoan = () => {
  const [sortDirection, setSortDirection] = useState("ascending");
  const { loans, searchText } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth)

  
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loanList(user.email));
  }, [user]);

  useEffect(() => {
    console.log("loans", loans)
  }, [loans]);

  const sortDescending = (a, b) => {
    const nameB = b.lastName.toLowerCase();
    const nameA = a.lastName.toLowerCase();

    if (nameB > nameA) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  };

  const sortAscending = (a, b) => {
    const nameA = a.lastName.toLowerCase();
    const nameB = b.lastName.toLowerCase();

    if (nameA > nameB) {
      return 1;
    }
    if (nameB > nameA) {
      return -1;
    }

    return 0;
  };

  return (
    <>
    <SideNavbar />
      <table id="default-table" className="bg-green-600 bg-cover mt-4 ml-72 h-max">
        <thead>
          <tr>
            <th>
              <span className="flex items-center text-2xl   underline border-solid border-2 border-black">
                Borrower
                <svg
                   onClick={() =>
                    setSortDirection(
                      sortDirection === "ascending" ? "descending" : "ascending"
                    )
                  }
                  className="w-4 h-4 ms-1 hover:bg-white rounded"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
            <th data-type="date">
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Date Submitted
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
            <th data-type="date">
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Est. Closing Date
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
            <th>
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Loan Amount
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>

            <th>
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Processor
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
            <th>
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Underwriter
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
            <th>
              <span className="flex items-center text-2xl  underline border-solid border-2 border-black">
                Loan Status
                <svg
                  className="w-4 h-4 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        {sortDirection === "ascending" ? (
        <tbody>
          {loans
          .slice()
          .filter(loan => searchText === "" || loan.lastName.toLowerCase() === searchText.toLowerCase())
          .sort(sortAscending)
          .map((loan, index) => (
            <tr key={index}>
              <td
                key={loan.id}
                className="font-medium text-center text-black whitespace-nowrap dark:text-black"
              >
                {loan.lastName}, {loan.firstName}
              </td>
              <td className="text-center p-4">
              {new Date(loan.dateSubmitted).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </td>
              <td className="text-center p-4">
              {new Date(loan.estClosingDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </td>
              <td className="text-center">$ {loan.amount}</td>
              <td className="text-center">{loan.loanProcessor.firstName} {loan.loanProcessor.lastName}</td>
              <td className="text-center">{loan.loanUnderwriter.firstName} {loan.loanUnderwriter.lastName}</td>
              <td className="text-center">{loan.loanStatus}</td>
             <td>
              <button
                // to={`/loan-details/${loan.id}`}
                onClick={() => navigate(`/loan-details/${loan.id}`)}
                // className=" text-black flex bg-white underline font-bold"
                className=" bg-white font-bold text-black mt-2 rounded hover:bg-green-400 border border-black p-1"
              >
                Update Loan
              </button>
              </td>
            </tr>
          ))}
        </tbody>
        ) : (
          <tbody>
          {loans
            .slice()
            .sort(sortDescending)
            .map((loan, index) => (
              <tr key={index} >
               <td
                key={loan.id}
                className="font-medium text-center text-black whitespace-nowrap dark:text-black"
              >
                {loan.lastName}, {loan.firstName}
              </td>
              <td className="text-center p-4">
              {new Date(loan.submittedDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </td>
              <td className="text-center p-4">
              {new Date(loan.estClosingDate).toLocaleString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})}
              </td>
              <td className="text-center">$ {loan.amount}</td>
              <td className="text-center">{loan.loanProcessor.firstName} {loan.loanProcessor.lastName}</td>
              <td className="text-center">{loan.loanUnderwriter.firstName} {loan.loanUnderwriter.lastName}</td>
              <td className="text-center">{loan.loanStatus}</td>
              <td>
              <button
                // to={`/loan-details/${loan.id}`}
                onClick={() => navigate(`/loan-details/${loan.id}`)}
                // className=" text-black bg-white underline font-bold"
                className=" bg-white font-bold text-black mt-2 rounded hover:bg-green-400 border border-black p-1"
              >
                Update Loan
              </button></td>
              </tr>
            ))}
        </tbody>
      )}
      
      </table>
    </>
  );
};

export default UpdateLoan;
