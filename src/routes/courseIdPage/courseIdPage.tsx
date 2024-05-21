import { IconBadge } from "@/components/icon-badge";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TitleForm from "./_components/title-form";

interface ICourse {
  Description: string | null;
  categoryId: string | null;
  createdAt: Date;
  id: string;
  imageUrl: string | null;
  isPublished: boolean;
  price: Number | null;
  title: string;
  updatedAt: Date;
  userId: string;
}
const CourseIdPage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse>();
  const navigate = useNavigate();
  const fetchCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      setCourse({ course, ...res.data });
    } catch (error) {
      navigate("/");
    }
  };

  const requiredFields = course && [
    course.title,
    course.Description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields?.filter(Boolean).length;

  const completedText = `${completedFields}/${totalFields}`;

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completedText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm
            initialData={{ title: course?.title }}
            courseId={course?.id}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;