import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import VideoUpload from "./chapter-video-upload";
import HLSPlayer from "@/components/video-player";

interface VideoFormProps {
  initialData: {
    videoUrl: string | null;
  };
  courseId: string | undefined;
  chapterId: string | undefined;
  userId: string | undefined;
}

const VideoForm = ({
  initialData,
  courseId,
  userId,
  chapterId,
}: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mx-2 h-4 w-4" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mx-2 h-4 w-4" />
              Change video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 flex flex-col items-center justify-center">
            <HLSPlayer
              src={`http://localhost:3000/api/courses/videos/${initialData.videoUrl}`}
              width="100%"
              height="auto"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <VideoUpload
            userId={String(userId)}
            chapterId={String(chapterId)}
            courseId={String(courseId)}
            previewSrc={String(initialData?.videoUrl)}
          />
          <div className="text-xs text-center text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoForm;
