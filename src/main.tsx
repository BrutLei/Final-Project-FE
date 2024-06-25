import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import RootLayout from "./layouts/root-layout";
import HelloPage from "./pages/helloWorld";
import SearchPage from "./pages/searchPage";
import TeacherPage from "./pages/teacherPage";
import CreatePage from "./pages/createPage";
import CourseIdPage from "./pages/courseIdPage/courseIdPage";
import ChapterIdPage from "./pages/chapterIdPage/chapterIdPage";
import CoursePage from "./pages/coursesPage/courses";

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
          {
            path: "courses/:courseId/chapter/:chapterId",
            element: <ChapterIdPage />,
          },
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
