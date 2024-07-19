import { CoursesListProps } from "@/pages/searchPage/searchPage";
import { CourseCard } from "./course-card";

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          return (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              chapters={item.chapters}
              price={item.price!}
              progress={item.progress}
              category={item.category.name!}
            />
          );
        })}
      </div>
      {items.length === 0 && (
        <div className="text-center text-base text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
