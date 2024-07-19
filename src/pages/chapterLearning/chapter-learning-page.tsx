import Banner from "@/components/banner";
import HLSPlayer from "@/components/video-player";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseEnrollButton from "../courseLearningPage/_components/course-enroll-btn";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-btn";

type Chapter = {
  chapter: {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
  } | null;
  course: {
    price: number | null;
  };
  videoUrl: string | null;
  attachments:
    | {
        id: string;
        name: string;
        url: string;
        courseId: string;
      }[]
    | [];
  nextChapter: {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
  } | null;
  userProgress: {
    id: string;
    userId: string;
    chapterId: string;
    isCompleted: boolean;
  } | null;
  purchase: {
    id: string;
    userId: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

const ChapterLearningPage = () => {
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const { userId } = useAuth();
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();

  const fetchChapter = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        { params: { userId } }
      );
      setChapter(response.data);
    } catch (error) {
      navigate("/search");
    }
  };

  useEffect(() => {
    fetchChapter();
  }, [chapterId, courseId]);

  const isLocked = !chapter?.chapter?.isFree && !chapter?.purchase;

  return (
    <div>
      {chapter?.userProgress?.isCompleted && (
        <Banner label="You already completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="p-4">
          <HLSPlayer
            src={`http://localhost:3000/api/courses/videos/${chapter?.videoUrl}`}
            isLocked={isLocked}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">
            {chapter?.chapter?.title}
          </h2>
          {chapter?.purchase ? (
            <div>
              <CourseProgressButton
                chapterId={chapterId as string}
                courseId={courseId as string}
                nextChapterId={chapter.nextChapter?.id}
                isCompleted={!!chapter.userProgress?.isCompleted}
              />
            </div>
          ) : (
            <CourseEnrollButton
              courseId={courseId}
              price={chapter?.course.price || 0}
            />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter?.chapter?.description || ""} />
        </div>
        {!!chapter?.attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {chapter.attachments.map((attachment) => (
                <a
                  href={`http://localhost:3000/api/courses/attachments/${attachment.url}`}
                  key={attachment.id}
                  target="_blank"
                  className="flex items-center p-3 w-full bg-sky-100 border text-sky-700 rounded-md hover:underline"
                >
                  <File size={24} />
                  <p className="line-clamp-1">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterLearningPage;
