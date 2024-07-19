import { Button } from "@/components/ui/button";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

type CourseProgressButtonProps = {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
};

const CourseProgressButton = (props: CourseProgressButtonProps) => {
  const navigate = useNavigate();

  const { userId, isLoaded, isSignedIn } = useAuth();
  const onClick = async () => {
    try {
      await axios.put(
        `/api/courses/${props.courseId}/chapters/${props.chapterId}/progress`,
        {
          userId,
          isCompleted: !props.isCompleted,
        }
      );
      if (!props.isCompleted && props.nextChapterId) {
        navigate(`/courses/${props.courseId}/chapters/${props.nextChapterId}`);
      }
      toast.success(
        `Chapter has been marked as ${
          props.isCompleted ? "not completed" : "completed"
        }`
      );
      navigate(0);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const Icon = props.isCompleted ? XCircle : CheckCircle;

  if (!isLoaded) {
    return <Loader2 className=" animate-spin" />;
  }

  if (!isSignedIn) {
    <Navigate to="/" />;
  }

  return (
    <Button
      type="button"
      variant={props.isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={onClick}
    >
      {props.isCompleted ? "Not completed" : "Mark as complete"}
      <Icon />
    </Button>
  );
};

export default CourseProgressButton;
