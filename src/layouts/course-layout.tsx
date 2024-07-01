import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import "./index.css";
import CourseSidebar from "@/pages/_components/course-sidebar";
import CourseNavbar from "@/pages/_components/course-navbar";
const CourseLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-full">
      <div className="h-20 md:pl-56 fixed inset-y-0 w-full z-50">
        <CourseNavbar />
      </div>
      <div className="sidebar h-full  w-56 flex-col fixed inset-y-0 z-50">
        <CourseSidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default CourseLayout;
