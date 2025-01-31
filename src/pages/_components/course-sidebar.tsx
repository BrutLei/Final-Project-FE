import { ICourse } from "@/layouts/course-layout";
import { CourseSidebarItem } from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

type CourseSidebarProps = {
  course: ICourse;
};

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  return (
    <div className=" h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {course.isPurchased && (
          <div className="mt-10">
            <CourseProgress
              variant={course.progressCount === 100 ? "success" : "default"}
              value={course.progressCount}
            />
          </div>
        )}
      </div>
      <div className=" flex flex-col w-full">
        {course?.chapters?.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !course.isPurchased}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
