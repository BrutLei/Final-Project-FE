import { Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

import CourseSidebar from "@/pages/_components/course-sidebar";
import CourseNavbar from "@/pages/_components/course-navbar";
import axios from "@/services/CustomAxios";

import "./index.css";

export interface ICourse {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  categoryId: string;
  chapters: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    userProgress: {
      id: string;
      chapterId: string;
      isCompleted: boolean;
    }[];
  }[];
  progressCount: number;
  isPurchased: boolean;
}

const CourseLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const { userId } = useAuth();
  const { id } = useParams();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `/api/courses/user/${userId}/get-course/${id}`
      );
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
      <div className="h-20 md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} />
      </div>
      <div className="sidebar h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default CourseLayout;
