import { cn } from "@/lib/utils";
import { LockKeyhole, PlayCircle } from "lucide-react";

import { useParams } from "react-router-dom";

interface CourseSidebarProps {
  title: string;
  isPurchase: boolean;
  chapters: { id: string; title: string; isFree: boolean }[];
}

const CourseSidebar = ({ title, isPurchase, chapters }: CourseSidebarProps) => {
  const { courseId } = useParams();

  return (
    <div className="w-full h-full border border-r shadow-sm overflow-y-auto">
      <div className="p-8 flex items-center justify-center border-b">
        <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
      </div>
      <div className="flex flex-col w-full">
        {isPurchase
          ? chapters?.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "w-full flex items-center justify-center p-4 border-b cursor-pointer hover:bg-gray-50",
                    courseId === chapter.id && "bg-gray-50"
                  )}
                >
                  <PlayCircle size={24} />
                  <p className="ml-4 truncate">{chapter.title}</p>
                </div>
              );
            })
          : chapters?.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "w-full flex items-center justify-center p-4 border-b cursor-pointer hover:bg-gray-50",
                    courseId === chapter.id && "bg-gray-50"
                  )}
                >
                  {chapter.isFree ? (
                    <PlayCircle size={24} />
                  ) : (
                    <LockKeyhole size={24} />
                  )}
                  <p className="ml-4 truncate">{chapter.title}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CourseSidebar;
