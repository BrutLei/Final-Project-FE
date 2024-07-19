import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

type CourseProgressProps = {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-sx",
};

const CourseProgress = (props: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={props.value} variant={props.variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[props.variant || "default"],
          sizeByVariant[props.size || "default"]
        )}
      >
        {Math.round(props.value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
