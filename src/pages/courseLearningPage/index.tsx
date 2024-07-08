import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "@/services/CustomAxios";

import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import HLSPlayer from "@/components/video-player";
import CourseEnrollButton from "./_components/course-enroll-btn";

interface IChapter {
  description: string;
  isFree: boolean;
  isPublished: boolean;
  isPurchased: boolean;
  position: number;
  title: string;
  videoUrl: string;
}

const CourseLearningPage = () => {
  const [chapter, setChapter] = useState<IChapter>({} as IChapter);
  const { userId } = useAuth();
  const { id, chapterId } = useParams();

  const fetchChapter = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${id}/chapter/${chapterId}/user/${userId}`
      );
      console.log(response.data);

      setChapter(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchChapter();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="aspect-video p-4 md:mx-20">
          {chapter.isFree || chapter.isPurchased ? (
            <div className=" mb-4">
              <HLSPlayer
                src={`http://localhost:3000/api/courses/videos/${chapter.videoUrl}`}
                width={"100%"}
                height={"auto"}
              />
            </div>
          ) : (
            <div className=" mb-4 bg-slate-800">
              <Loader2
                size="64"
                className="h-8 w-8 animate-spin text-secondary"
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <h1 className="text-2xl font-semibold mb-2">{chapter.title}</h1>
            <CourseEnrollButton price={100} courseId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseLearningPage;
