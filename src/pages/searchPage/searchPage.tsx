import axios from "@/services/CustomAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CourseListProps {
  id: string;
  title: string;
  imageUrl: string;
  chapters: { id: string }[];
  price: number;
  progress: number | null;
  category: {
    id: string;
    name: string;
  };
}
interface CoursesListProps extends Array<CourseListProps> {}
const SearchPage = () => {
  const [courses, setCourses] = useState<CoursesListProps>([]);

  const fetchCourses = async () => {
    try {
      const courses = await axios.get("/api/courses/get-courses");
      console.log(courses.data);
      setCourses(courses.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div
      className="
      container
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-6
    "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {courses.map((course) => (
          <Link
            to={`/course/${course.id}/chapter/${course?.chapters[0]?.id}`}
            key={course.id}
          >
            <div className="border rounded-lg p-4 h-full ">
              <div className="w-full aspect-auto overflow-hidden relative rounded-md">
                <img
                  src={`http://localhost:3000/api/courses/images/${course.imageUrl}`}
                  alt={course.title}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-4">{course.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {course.category.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {course.chapters.length}{" "}
                  {course.chapters.length > 1 ? "Chapters" : "Chapter"}
                </p>
              </div>
              <div>
                {course.progress !== null ? (
                  <p>{course.progress}</p>
                ) : (
                  <p className="text-lg font-semibold mt-1">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
