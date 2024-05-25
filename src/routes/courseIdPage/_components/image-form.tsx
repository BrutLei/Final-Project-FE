import { z } from "zod";

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from "@/services/CustomAxios";

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

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Description is required" }),
});

const ImageForm = ({ initialData, courseId, userId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log({ userId, ...data });
      await axios.patch(`/api/courses/${courseId}`, { userId, data: data });
      toggleEdit();
      navigate(0);
      toast.success("Course updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

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
          <div className="relative aspect-video mt-2">
            <img
              src={initialData?.imageUrl}
              alt="Upload"
              className="object-cover rounded-md"
            />
            Current image
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload />
          <div className="text-xs text-center text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
