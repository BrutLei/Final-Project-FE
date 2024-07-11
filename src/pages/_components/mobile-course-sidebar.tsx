import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";
import { ICourse } from "@/layouts/course-layout";

type MobileCourseSidebarProps = {
  course: ICourse;
};

const MobileCourseSidebar = ({ course }: MobileCourseSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transittion">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <CourseSidebar course={course} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileCourseSidebar;
