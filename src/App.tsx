import { Route, Routes, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./routes";

function App() {
  const navigate = useNavigate();

  const directHome = () => {
    navigate("/");
  };
  const directLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="items-center justify-evenly">
        <button
          className="h-10 bg-red-500 mr-3 border border-black rounded-sm "
          onClick={directHome}
        >
          Back to home
        </button>
        <button
          className="h-10 w-14 bg-blue-500 ml-3 border border-black rounded-sm "
          onClick={directLogin}
        >
          Login
        </button>
      </div>
      <Routes>
        {routes.map((e, index) => {
          const Page = e.page;
          const Layout = e.layout ? e.layout : Fragment;
          return (
            <Route
              key={index}
              path={e.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer newestOnTop closeOnClick rtl={false} pauseOnFocusLoss />
    </>
  );
}

export default App;
