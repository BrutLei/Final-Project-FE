import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const directHome = () => {
    navigate("/");
  };
  return (
    <>
      <button
        className="w-20 h-16 bg-blue-500 border border-black rounded-sm m-4 "
        onClick={directHome}
      >
        Back to home
      </button>
      <div className="flex flex-col items-center justify-center h-svh w-svw">
        <h2 className="capitalize text-3xl font-bold mb-10 min-[375px]:p-3 min-[375px]:text-center ">
          Welcome back to Online Shop
        </h2>

        <div className="w-[350px] flex flex-col items-start justify-start ">
          <form className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Type your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <label
              htmlFor="password"
              className="block my-4 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <button
              type="submit"
              className="w-full text-balance text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-2"
            >
              Login
            </button>
          </form>
          <p className="text-[#0055aa] text-xs capitalize">forgot password?</p>
          <p className="w-full bg-zinc-700 border-b text-center justify-center leading-[0.2rem] my-[10px] mx-auto">
            <span className="bg-white py-[10] capitalize px-1">
              or login with
            </span>
          </p>
          <div className="flex items-center justify-evenly w-full my-3">
            <button className="h-10 mr-[5px] my-[5px] border border-gray-400 rounded w-[50%] capitalize">
              <FontAwesomeIcon
                icon={faGooglePlus}
                size="xl"
                style={{ color: "#ffa53d" }}
                className="mr-1"
              />
              google
            </button>
            <button className="h-10 ml-[5px] my-[5px] border border-gray-400 rounded w-[50%] capitalize">
              <FontAwesomeIcon
                icon={faFacebook}
                size="xl"
                style={{ color: "#359eed" }}
                className="mr-1"
              />
              facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
