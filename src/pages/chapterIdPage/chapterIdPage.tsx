import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import axios from "@/services/CustomAxios";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IconBadge } from "@/components/icon-badge";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import VideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = () => {
  interface IChapter {
    title: string;
    description: string | null;
    videoUrl: string | null;
    isFree: boolean;
    isPublished?: boolean;
  }

  const { isSignedIn, isLoaded, userId } = useAuth();
  const { courseId, chapterId } = useParams();

  const navigate = useNavigate();

  const [change, setChange] = useState(false);
  const [chapter, setChapter] = useState<IChapter>({
    title: "",
    description: "",
    videoUrl: "",
    isFree: false,
    isPublished: false,
  });

  const fetchChapter = async () => {
    try {
      const res = await axios.get(
        `api/courses/${courseId}/chapters/${chapterId}`
      );
      if (res && res.data) {
        setChapter(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch chapter");
    }
  };

  useEffect(() => {
    fetchChapter();
  }, [change]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace={true} />;
  }
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = completedFields === requiredFields.length;
  const completedText = `${completedFields}/${requiredFields.length} fields completed`;

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          label="This chapter is unpublished. It will not be visible in this course"
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <button
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
              onClick={() => navigate(`/teacher/courses/${courseId}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <p>Back to course setup</p>
            </button>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <p>{completedText}</p>
              </div>
              <ChapterActions
                disabled={!isCompleted}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <p className="text-lg">Customize your chapter</p>
            </div>
            <ChapterTitleForm
              chapterId={chapterId}
              courseId={courseId}
              userId={userId}
              initialData={{ title: chapter.title }}
              setChange={() => setChange(!change)}
            />
            <ChapterDescriptionForm
              initialData={{ description: chapter.description || "" }}
              chapterId={chapterId}
              courseId={courseId}
              userId={userId}
              setChange={() => setChange(!change)}
            />
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <p className="text-lg">Access setting</p>
              </div>
              <ChapterAccessForm
                initialData={{ isFree: chapter.isFree }}
                chapterId={chapterId}
                courseId={courseId}
                userId={userId}
                setChange={() => setChange(!change)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <p className="text-lg">Add a video</p>
            </div>
            <VideoForm
              initialData={{
                videoUrl: chapter.videoUrl ? chapter.videoUrl : "",
              }}
              chapterId={chapterId}
              courseId={courseId}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
