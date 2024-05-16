import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithGoogle } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { signUp } from "../../services/apiHandler/UserService";
import { toast, Slide } from "react-toastify";

const Login = () => {
  const [loginRegister, setloginRegister] = useState(1);
  /**
   * loginRegister = 1 => login
   * loginRegister = 0 => register
   */
  const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  const [refresh, setRefresh] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const changeLoginRegister = () => {
    if (loginRegister === 1) {
      setloginRegister(0);
    }
    if (loginRegister === 0) {
      setloginRegister(1);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (loginRegister === 0) {
      if (namePattern.test(fullName) === false) {
        console.log(
          "->>namePattern.test(fullName)",
          namePattern.test(fullName)
        );
      } else {
        if (password !== confirmPassword) {
          setError("Password does not match");
          return;
        } else {
          const response = (await signUp({ email, password, fullName })) as {
            message: string;
            code: number;
            data: any;
          };
          if (response) {
            if (response.code === 400) {
              toast.error(response.message, {
                autoClose: 3000,
                theme: "colored",
                transition: Slide,
                closeOnClick: true,
              });
            }
            if (response.code === 200) {
              toast.success(response.message, {
                position: "top-center",
                autoClose: 3002,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
              });
            }
          }
        }
      }
    }
  };

  const signinGoogle = async () => {
    await signInWithGoogle();
  };

  useEffect(() => {}, [refresh]);
  return (
    <>
      <h2 className="capitalize text-3xl font-bold mb-10 min-[375px]:p-3 min-[375px]:text-center ">
        {loginRegister === 1
          ? "Welcome back to E-learning"
          : "Create an account"}
      </h2>
      <div className="w-[350px] flex flex-col items-start justify-start ">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          {loginRegister === 0 ? (
            <div>
              <label
                htmlFor="full-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                name="full-name"
                type="text"
                placeholder="Type your full name"
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
          ) : (
            <div></div>
          )}
          <div>
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
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {loginRegister === 0 ? (
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                placeholder="Type your password again"
                onChange={(e) => {
                  setError("");
                  setConfirmPassword(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              {error !== "" ? (
                <p className="text-red-500 text-xs">{error}</p>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <button
            type="submit"
            className="w-full text-balance text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-2"
          >
            {loginRegister === 1 ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-[#0055aa] text-xs capitalize underline cursor-pointer">
            forgot password?
          </p>
          <p
            className={"text-[#0055aa] text-xs capitalize cursor-pointer "}
            onClick={changeLoginRegister}
          >
            {loginRegister === 1 ? "Sign Up" : "Login"}
          </p>
        </div>
        <p className="w-full bg-zinc-700 border-b text-center justify-center leading-[0.2rem] my-[10px] mx-auto">
          <span className="bg-white py-[10] capitalize px-1">
            or login with
          </span>
        </p>
        <div className="flex items-center justify-evenly w-full my-3">
          <button
            className="h-10 mr-[5px] my-[5px] border border-gray-400 rounded w-[50%] capitalize"
            onClick={signinGoogle}
          >
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
    </>
  );
};

export default Login;
