
import { Link } from "react-router"


const Footer = () => {
  return (
    <div>
        <footer className="bg-black shadow dark:bg-black mt-10">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-lg text-green-600 sm:text-center dark:text-green-600">© 2025 <a className="hover:underline">Loan Tracker™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-lg font-medium text-yellow-400 dark:text-yellow-400 sm:mt-0">
        <li>
            <Link to="/about" className="hover:underline me-4 md:me-6">About</Link>
        </li>
        {/* <li>
            <a href="#" className="hover:underline me-4 md:me-6">Sign Up</a>
        </li> */}
        <li>
            <Link to="/login" className="hover:underline me-4 md:me-6">Login</Link>
        </li>
        <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>
    </div>
  )
}

export default Footer