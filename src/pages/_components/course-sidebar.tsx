import { cn } from "@/lib/utils";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { LockKeyhole, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IChapter {
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

const CourseSidebar = () => {
  const [course, setCourse] = useState<IChapter>({} as IChapter);
  const { isLoaded, userId } = useAuth();
  const { id, courseId } = useParams();

  const fetchCourse = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `/api/courses/user/${userId}/get-course/${id}`
        );
        console.log(response.data);

        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full border border-r shadow-sm overflow-y-auto">
      <div className="p-8 flex items-center justify-center border-b">
        <h1 className="font-semibold text-lg md:text-xl">{course?.title}</h1>
      </div>
      <div className="flex flex-col w-full">
        {course.isPurchase
          ? course?.chapters?.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "w-full flex items-center justify-center p-4 border-b cursor-pointer hover:bg-gray-50",
                    courseId === chapter.id && "bg-gray-50"
                  )}
                >
                  <PlayCircle size={24} />
                  <p className="ml-4 truncate">{chapter.title}</p>
                </div>
              );
            })
          : course?.chapters?.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "w-full flex items-center justify-center p-4 border-b cursor-pointer hover:bg-gray-50",
                    courseId === chapter.id && "bg-gray-50"
                  )}
                >
                  {chapter.isFree ? (
                    <PlayCircle size={24} />
                  ) : (
                    <LockKeyhole size={24} />
                  )}
                  <p className="ml-4 truncate">{chapter.title}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CourseSidebar;
