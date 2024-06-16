import { useState } from "react";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";

import { IAttachments } from "../courseIdPage";
import toast from "react-hot-toast";
import axios from "@/services/CustomAxios";
import { useNavigate } from "react-router-dom";
import AttachmentUpload from "./attachments-upload";
import { cn } from "@/lib/utils";

interface AttachmentFormProps {
  initialData: IAttachments;
  courseId: string | undefined;
  userId: string | undefined;
}

const AttachmentForm = ({
  initialData,
  courseId,
  userId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/attachments/${id}`);
      toast.success("Attachment deleted successfully");
      navigate(0);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mx-2 h-4 w-4" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.length === 0 && (
            <p className="text-sm text-slate-500 mt-2 italic">
              No attachments yet
            </p>
          )}
          {initialData.length > 0 && (
            <div
              className={cn(
                "space-y-2",
                initialData.length > 0 && "overflow-y-auto h-auto max-h-52"
              )}
            >
              {initialData.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-600 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="truncate">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition-colors"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-5 w-5 ml-2 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <AttachmentUpload userId={String(userId)} courseId={String(courseId)} />
      )}
    </div>
  );
};
export default AttachmentForm;
