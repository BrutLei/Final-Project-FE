import NavbarRoutes from "@/components/navbar-routes";
import MobileCourseSidebar from "./mobile-course-sidebar";

const CourseNavbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileCourseSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
