import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import { Fragment } from "react/jsx-runtime";

function App() {
  const navigate = useNavigate();

  const directLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <button
        className="w-20 h-16 bg-red-500 border border-black rounded-sm m-4 "
        onClick={directLogin}
      >
        Login
      </button>
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
    </>
  );
}

export default App;
