import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import "./index.css";
import CourseSidebar from "@/pages/_components/course-sidebar";
import CourseNavbar from "@/pages/_components/course-navbar";
import { useEffect, useState } from "react";
import axios from "@/services/CustomAxios";

export interface IChapter {
  categoryId: string;
  chapters: { id: string; title: string; isFree: boolean }[];
  length: number;
  createdAt: Date;
  description: string;
  id: string;
  imageUrl: string;
  isPublished: boolean;
  isPurchase: boolean;
  price: number;
  title: string;
  updatedAt: Date;
  userId: string;
}

const CourseLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [course, setCourse] = useState<IChapter>({} as IChapter);
  const { userId } = useAuth();
  const { id } = useParams();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `/api/courses/user/${userId}/get-course/${id}`
      );
      console.log(response.data);

      setCourse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

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
        <CourseSidebar
          title={course.title}
          isPurchase={course.isPurchase}
          chapters={course.chapters}
        />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default CourseLayout;
