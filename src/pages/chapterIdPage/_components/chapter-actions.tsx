import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string | undefined;
  chapterId: string | undefined;
  isPublished: boolean | undefined;
  setChange: () => void;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
  setChange,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const navigate = useNavigate();

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`api/courses/${courseId}/chapters/${chapterId}`, {
        data: { userId: userId },
      });
      toast.success("Chapter deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chapter");
    } finally {
      setIsLoading(false);
      navigate(`/teacher/courses/${courseId}`);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `api/courses/${courseId}/chapters/${chapterId}/unpublish`,
          {
            userId: userId,
          }
        );
        toast.success("Chapter unpublished");
        setChange();
      } else {
        await axios.patch(
          `api/courses/${courseId}/chapters/${chapterId}/publish`,
          {
            userId: userId,
          }
        );
        toast.success("Chapter published");
        setChange();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
