import NavbarRoutes from "@/components/navbar-routes";
import MobileCourseSidebar from "./mobile-course-sidebar";
import { ICourse } from "@/layouts/course-layout";

type CourseNavbarProps = {
  course: ICourse;
};

const CourseNavbar = ({ course }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileCourseSidebar course={course} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
