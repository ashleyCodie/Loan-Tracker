import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/authSlice";
import house from "../assets/moneyandhouse.jpg";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && user.token) {
      sessionStorage.setItem("token", user.token);
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginForm.email === "" || loginForm.password === "") {
    } else {
      dispatch(authLogin({ ...loginForm }));
    }
  };

  return (
    <div className="bg-green-600">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-60 w-auto mt-20 border border-black"
          src={house}
          alt="Your Company"
        />
        <h2 className="mt-20  text-center text-3xl font-extrabold leading-9 tracking-tight text-black">
          Login to your account
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mt-10 mb-2 text-sm font-medium text-blackk:text-green-600"
          >
            Your email
          </label>
          <input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            type="email"
            id="email"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-black text-black"
          >
            Your password
          </label>
          <input
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            type="password"
            id="password"
            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4  bg-white text-green-600 border border-green-600 rounded bg-green-600 focus:ring-3 focus:ring-green-600 dark:bg-white dark:border-green-600 dark:focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-offset-green-600"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-black dark:text-black"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-black hover:bg-green-800 focus:ring-4 focus:outline-green-600 focus:ring-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-green-800 dark:focus:ring-green-600"
        >
          Login
        </button>
      </form>

      {loading && <h1>LOADING...</h1>}
    </div>
  );
};

export default Login;
