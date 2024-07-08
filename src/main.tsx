import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

// Import the layouts
import RootLayout from "./layouts/root-layout";

// Import the components
import HelloPage from "./pages/helloWorld";
import SearchPage from "./pages/searchPage/searchPage";
import TeacherPage from "./pages/teacherPage";
import CreatePage from "./pages/createPage";
import CourseIdPage from "./pages/courseEditPage/courseEditPage";
import ChapterIdPage from "./pages/chapterIdPage/chapterIdPage";
import CoursePage from "./pages/coursesPage/courses";
import CourseLearningPage from "./pages/courseLearningPage";
import CourseLayout from "./layouts/course-layout";

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
  {
    element: <CourseLayout />,
    children: [
      {
        path: "/course/:id/chapter/:chapterId",
        element: <CourseLearningPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      routerPush={(to) => router.navigate(to)}
      routerReplace={(to) => router.navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </React.StrictMode>
);
