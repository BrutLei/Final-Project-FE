import { Link } from "react-router-dom";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  key: string;
  id: string;
  title: string;
  chapters: { id: string }[];
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = (props: CourseCardProps) => {
  return (
    <Link to={`/courses/${props.id}/chapters/${props?.chapters?.[0]?.id}`}>
      <div className=" group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className=" relative w-full aspect-video rounded-md overflow-hidden">
          <img
            src={`http://localhost:3000/api/courses/images/${props?.imageUrl}`}
            alt={props.title}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {props.title}
          </div>
          <p className="text-xs text-muted-foreground">{props.category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {props.chaptersLength}{" "}
                {props.chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {props.progress !== null ? (
            <CourseProgress
              value={props.progress}
              size="sm"
              variant={props.progress === 100 ? "success" : "default"}
            />
          ) : (
            <p className=" text-md md:text-sm font-medium text-slate-700">
              {formatPrice(props.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
