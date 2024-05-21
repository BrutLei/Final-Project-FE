import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import RootLayout from "./layouts/root-layout";
import HelloPage from "./routes/helloWorld";
import SearchPage from "./routes/searchPage";
import TeacherPage from "./routes/teacherPage";
import CoursePage from "./routes/courses";
import CreatePage from "./routes/createPage";
import CourseIdPage from "./routes/courseIdPage/courseIdPage";

// Import the layouts

// Import the components

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HelloPage /> },
      { path: "/search", element: <SearchPage /> },
      {
        path: "/teacher",
        element: <Outlet />,
        children: [
          { path: "", element: <TeacherPage /> },
          { path: "courses", element: <CoursePage /> },
          { path: "courses/:id", element: <CourseIdPage /> },
          { path: "create", element: <CreatePage /> },
        ],
      },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
