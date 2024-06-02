import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import FileUpload from "./file-upload";

interface ImageFormProps {
  initialData: {
    imageUrl: string | undefined;
  };
  courseId: string | undefined;
  userId: string | undefined;
}

const ImageForm = ({ initialData, courseId, userId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="mx-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mx-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 flex flex-col items-center justify-center">
            <img
              src={`http://localhost:3000/api/courses/images/${initialData?.imageUrl}`}
              alt="Upload"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            userId={String(userId)}
            courseId={String(courseId)}
            previewSrc={`${initialData?.imageUrl}`}
          />
          <div className="text-xs text-center text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
