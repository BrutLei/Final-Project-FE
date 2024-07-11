import axios from "@/services/CustomAxios";
import { useEffect, useState } from "react";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, useSearchParams } from "react-router-dom";
import { CoursesList } from "@/components/courses-list";

// Courses

type CourseListProps = {
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
};

export interface CoursesListProps {
  items: CourseListProps[];
}
// Categories
export type Category = {
  id: string;
  name: string;
};

const SearchPage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();

  const [courses, setCourses] = useState<CourseListProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchParams] = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const fetchCategories = async () => {
    try {
      const categories = await axios.get("/api/categories");
      setCategories(categories.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      console.log(currentCategoryId);

      const courses = await axios.get(`/api/courses/get-courses/${userId}`, {
        params: {
          categoryId: currentCategoryId,
          title: currentTitle,
        },
      });
      console.log(courses.data);

      setCourses(courses.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, [currentCategoryId, currentTitle]);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
