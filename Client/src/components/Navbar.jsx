import { Link, useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react"
import  house  from "../assets/moneyandhouse.jpg"
import { logout } from "../redux/authSlice"

const Navbar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
      const token = sessionStorage.getItem("token")
      if (token) {
        const logoutToken = token.split(",")[0]
        dispatch(logout(logoutToken))
        // sessionStorage.removeItem("token")
        navigate("/")
      }
    }

  return (
<>
    <nav className="bg-black relative z-20 border-gray-200 dark:bg-black">
      <div className="ml-10 flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={house}
            className="h-20"
            alt="Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-green-600">
             Loan Tracker
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         {isLoggedIn && <button
            type="button"
            className="flex text-sm bg-green-600 rounded-full md:me-10 focus:ring-4 focus:ring-green-600 dark:focus:ring-green-600 ring-green-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-16 h-16 rounded-full"
              src={
                new URL(
                  `../assets/${user.avatar}`,
                  import.meta.url
                ).href
              }
              alt="user photo"
            />
          </button> }
          </div>
          {/* <!-- Dropdown menu --> */}
         
        <div
          className="items-center justify-between hidden w-full me-20 md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 text-green-600 text-2xl rounded hover:bg-green-100 md:hover:bg-transparent md:hover:text-white md:p-0 ${location.pathname === "/" ? "dark:text-green-600" : "dark:text-white"}  md:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {isLoggedIn && <li>
              <Link
                to="/dashboard"
                className={`block py-2 px-3 text-gray-900 text-2xl rounded hover:bg-green-100 md:hover:bg-transparent md:hover:text-white md:p-0 ${location.pathname === "/dashboard" ? "dark:text-green-600" : "dark:text-white"}  md:dark:hover:text-green-600 dark:hover:bg-green-100 dark:hover:text-white md:dark:hover:bg-transparent dark:border-green-100`}
                aria-current="page"
              >
                Dashboard
              </Link>
            </li> }
                   {!isLoggedIn ? (
                 <li>
                 <Link
                   to="/login"
                   className={`block py-2 px-3 text-gray-900 text-2xl rounded hover:bg-green-100 md:hover:bg-transparent md:hover:text-white md:p-0 ${location.pathname === "/logout" ? "dark:text-green-600" : "dark:text-white"}  md:dark:hover:text-green-600 dark:hover:bg-green-100 dark:hover:text-white md:dark:hover:bg-transparent dark:border-green-100`}
                 >
                   Login
                 </Link>
               </li>
              )
              :
              (
              <li>
                <span
                  onClick={handleLogout}
                  className={`block py-2 px-3 text-gray-900 text-2xl rounded hover:bg-green-100 md:hover:bg-transparent md:hover:text-white md:p-0 ${location.pathname === "/login" ? "dark:text-green-600" : "dark:text-white"}  md:dark:hover:text-green-600 dark:hover:bg-green-100 dark:hover:text-white md:dark:hover:bg-transparent dark:border-green-100`}
                >
                   Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>

    

</>
  );
};

export default Navbar;