import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { loanList, loanSearched } from "../redux/loanSlice";
import { messageList } from "../redux/messageSlice"

const SideNavbar = () => {
  // const [showDropdown1, setShowDropdown1] = useState(false);
  // const [showDropdown2, setShowDropdown2] = useState(false);
  const [text, setText] = useState("");
  const { loading, isLoggedIn, user } = useSelector((state) => state.auth);
  const { loans, searchText } = useSelector((state) => state.loan);
  const { messages } = useSelector((state) => state.message)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const logoutToken = token.split(",")[0];
      dispatch(logout(logoutToken));
      
    }
  };

  useEffect(() => {
    dispatch(loanList(user.email));
  }, [user]);

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(loanSearched(text));
  };

  useEffect(() => {
    console.log("loans", loans);
  }, [loans]);

    useEffect(() => {
      dispatch(messageList(user.email))
    }, [user]);

  return (
    <aside
      className="fixed top-0 left-0 z-10 w-64 h-screen pt-14 transition-transform -translate-x-full bg-black border-r border-black md:translate-x-0 dark:bg-black dark:border-black"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-black dark:bg-black">
        <form onSubmit={submitSearch} className=" mt-14">
          <label htmlFor="sidebar-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-black dark:text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              name="search"
              id="sidebar-search"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Borrowers Name"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 font-bold p-1 rounded ml-16 mt-2"
          >
            Search
          </button>
        </form>

        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex mt-10 items-center p-2 text-base font-medium text-white rounded-lg dark:text-white hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-green-600 transition duration-75 dark:text-green-600 group-hover:text-green-600  "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span
                className={`ml-3 ${
                  location.pathname === "/dashboard"
                    ? "dark:text-green-600"
                    : "dark:text-white"
                } hover:text-black`}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-white dark:hover:bg-white group">
               <svg className="shrink-0 w-5 h-5 text-green-600 transition duration-75 dark:text-green-600 group-hover:text-green-600 dark:group-hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className={`ml-3 ${
                  location.pathname === "/inbox"
                    ? "dark:text-green-600"
                    : "dark:text-white"
                } hover:text-black`}>Inbox</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-yellow-400 rounded-full dark:bg-yellow-400 dark:text-black">
               {
                      messages.filter((message) => message.messageFor === user.email)
                        .length
                    }
                    </span>
            </Link>
         </li>
          <li>
            <Link
              // onClick={() => setShowDropdown1(!showDropdown1)}
              type="button"
              className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white dark:text-white dark:hover:bg-white hover:text-black"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-600"
                // aria-hidden="true"
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
                  d="M12 11H4m15.5 5a.5.5 0 0 0 .5-.5V8a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44l-1.436-2.12a1 1 0 0 0-.828-.44H8a1 1 0 0 0-1 1M4 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44L9.985 8.44A1 1 0 0 0 9.157 8H5a1 1 0 0 0-1 1Z"
                />
              </svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                All Loans
              </span>
            </Link>
            <ul id="dropdown-pages" className=" py-2 space-y-2">
              <li>
                <Link
                  to="/pipeline"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group dark:hover:text-black hover:bg-white dark:text-white dark:hover:bg-white"
                >
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
                      d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
                    />
                  </svg>
                  <span
                    className={`ml-3 ${
                      location.pathname === "/pipeline"
                        ? "dark:text-green-600"
                        : "dark:text-white dark:hover:text-black"
                    }`}
                  >
                    Tasks
                  </span>
                </Link>
              </li>
          
              <li>
                <Link
                  to="/closing-calendar"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`ml-3 ${
                      location.pathname === "/closing-calendar"
                        ? "dark:text-green-600"
                        : "dark:text-white dark:hover:text-black"
                    }`}
                  >
                    Closing Calendar
                  </span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/production"
              type="button"
              className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white dark:hover:text-black dark:text-white dark:hover:bg-white"
              aria-controls="dropdown-sales"
              data-collapse-toggle="dropdown-sales"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-green-600 transition duration-75 group-hover:text-green-600 dark:text-green-600 dark:group-hover:text-green"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className={`flex-1 ml-3 text-left whitespace-nowrap ${
                  location.pathname === "/production"
                    ? "dark:text-green-600"
                    : "dark:text-white dark:hover:text-black"
                }`}
              >
                Production
              </span>
            </Link>

          {user.roles.includes("Loan Manager") && (<ul id="dropdown-sales" className="py-2 space-y-2">
              <li>
                <Link
                  to="/submitted"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Submitted
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-yellow-400 rounded-full dark:bg-yellow-300 dark:text-black">
                    {
                      loans.filter((loan) => loan.loanStatus === "Submitted")
                        .length
                    }
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/approved"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Approved
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-yellow-400 rounded-full dark:bg-yellow-300 dark:text-black">
                    {
                      loans.filter((loan) => loan.loanStatus === "Approved")
                        .length
                    }
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/denied"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Denied
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-yellow-400 rounded-full dark:bg-yellow-300 dark:text-black">
                    {
                      loans.filter((loan) => loan.loanStatus === "Denied")
                        .length
                    }
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/closed"
                  className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-white hover:text-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Closed
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-yellow-400 rounded-full dark:bg-yellow-300 dark:text-black">
                    {
                      loans.filter((loan) => loan.loanStatus === "Closed")
                        .length
                    }
                  </span>
                </Link>
              </li>
            </ul> )}
          </li>
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <Link
              to="/directory"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-white dark:hover:text-black dark:hover:bg-white dark:text-white group"
            >
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
                  strokeWidth="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <span
                className={`ml-3 ${
                  location.pathname === "/directory"
                    ? "dark:text-green-600"
                    : "dark:text-white dark:hover:text-black "
                } `}
              >
                User Directory
              </span>
            </Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-white dark:hover:text-black dark:hover:bg-white dark:text-white group"
              >
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
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <span className="ml-3">Login</span>
              </Link>
            </li>
          ) : (
            <li>
              <span
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-white dark:hover:bg-white dark:hover:text-black dark:text-white group"
              >
                {" "}
                <svg
                  className="w-6 h-6 me-3 text-green-600 dark:text-green-600"
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
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>


    </aside>
  );
};

export default SideNavbar;