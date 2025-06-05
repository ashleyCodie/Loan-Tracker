import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loanList } from "../redux/loanSlice";
import SideNavbar from "../components/SideNavbar";


const DashboardLM = () => {
  const {  user } = useSelector((state) => state.auth);
  const { loans } = useSelector((state) => state.loan);
  // const { showDropdown, setShowDropdown } = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loanList(user.email)); 
  }, [user]);

  
  useEffect(() => {
    console.log("loans", loans);
  }, [loans]);

  return (
    <>
      <div className="antialiased bg-green-600 dark:bg-green-600 h-scroll">
        <h1 className="ml-48 mt-10 text-5xl font-extrabold text-center">
          LM Dashboard
        </h1>
        <h1 className="ml-48 mt-10 text-2xl font-extrabold text-center">
          Hello, {user.firstName}
        </h1>

        <SideNavbar />

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-black border-dashed rounded-lg dark:border-black">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-black dark:bg-black">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-600"
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
                    d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <button
                    onClick={() => navigate("/add-new-loan")}
                    type="button"
                    className="text-white ml-4"
                  >
                    Add A New Loan
                  </button>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-black dark:bg-black">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-green-600 transition duration-75 dark:text-green-600 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <button
                    onClick={() => navigate("/update-loan")}
                    type="button"
                    className="text-white ml-4"
                  >
                    Update A Loan
                  </button>
                </p>
              </div>

              <div className="flex items-center justify-center h-24 rounded bg-black dark:bg-black">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-600"
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
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p className="text-2xl text-gray-400 dark:text-white">
                  <button
                    onClick={() => navigate("/pipeline")}
                    type="button"
                    className="text-white ml-4"
                  >
                    Loan Tasks
                  </button>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-black dark:bg-black">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-600"
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
                  d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
                />
              </svg>
              <p className="text-2xl text-white dark:text-white">
                <button
                  onClick={() => navigate("/pipeline")}
                  type="button"
                  className="text-white ml-4"
                >
                  Loan Pipeline
                </button>
              </p>
            </div>

            <div className="flex items-center justify-center h-48 mb-1 rounded bg-black dark:bg-black">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-600"
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
                  d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                />
              </svg>

              <p className="text-2xl text-white dark:text-white">
                <button
                  onClick={() => navigate("/production")}
                  type="button"
                  className="text-white ml-4"
                >
                  My Teams Production
                </button>
              </p>
              <svg
                className="w-6 h-6 ml-4 text-green-600 dark:text-green-600"
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
                  d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLM;