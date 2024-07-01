import { IconBadge } from "@/components/icon-badge";
import axios from "@/services/CustomAxios";
import { useAuth } from "@clerk/clerk-react";
import { DollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";
import Banner from "@/components/banner";
import CourseActions from "./_components/course-actions";

interface ICourse {
  description: string | null;
  categoryId: string | null;
  createdAt: Date;
  id: string;
  imageUrl: string | null;
  isPublished: boolean;
  price: number | null;
  title: string;
  updatedAt: Date;
  userId: string;
}

interface ICategory {
  value: string;
  label: string;
}
interface ICategories extends Array<ICategory> {}

interface IAttachment {
  id: string;
  name: string;
  url: string;
}

interface IChapter {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IChapters extends Array<IChapter | null> {}

export interface IAttachments extends Array<IAttachment> {}

const CourseIdPage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();

  const { id } = useParams();

  const [course, setCourse] = useState<ICourse>();
  const [categories, setCategories] = useState<ICategories>([]);
  const [attachments, setAttachments] = useState<IAttachments>([]);
  const [chapters, setChapters] = useState<IChapters>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();
  const fetchCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/${id}`);
      if (res && res.data) {
        setCourse({ course, ...res.data });
      }
    } catch (error) {
      navigate("/");
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      const categoriesList = res.data.map(
        (category: { id: string; name: string }) => ({
          label: category.name,
          value: category.id,
        })
      );
      setCategories(categoriesList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttachment = async () => {
    try {
      const res = await axios.get(`/api/attachments/${id}`);
      setAttachments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChapters = async () => {
    try {
      const res = await axios.get(`/api/courses/${id}/chapters`);
      setChapters(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const requiredFields = course && [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    chapters.some((chapter) => chapter?.isPublished),
  ];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields?.filter(Boolean).length;
  const isCompleted = completedFields === totalFields;

  const completedText = `${completedFields}/${totalFields}`;

  useEffect(() => {
    fetchCourse();
    fetchCategories();
    fetchAttachment();
    fetchChapters();
  }, [isRefreshing]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!course?.isPublished && (
        <Banner
          label="This course is unpublished and will not be visible to students."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completedText}
            </span>
          </div>
          <CourseActions
            disabled={!isCompleted}
            courseId={course?.id}
            isPublished={course?.isPublished}
            setChange={() => setIsRefreshing(!isRefreshing)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{ title: course?.title || "" }}
              courseId={course?.id}
              userId={userId}
              onRefresh={() => setIsRefreshing(!isRefreshing)}
            />
            <DescriptionForm
              initialData={{ description: course?.description || "" }}
              courseId={course?.id}
              userId={userId}
              onRefresh={() => setIsRefreshing(!isRefreshing)}
            />
            <ImageForm
              initialData={{ imageUrl: course?.imageUrl || "" }}
              courseId={course?.id}
              userId={userId}
            />
            <CategoryForm
              initialData={{ categoryId: course?.categoryId || "" }}
              courseId={course?.id || ""}
              userId={userId}
              options={categories}
              onRefresh={() => setIsRefreshing(!isRefreshing)}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <p className="text-xl">Course Chapter</p>
              </div>
              <ChapterForm
                initialData={{ chapters: chapters }}
                courseId={course?.id}
                userId={userId}
                onRefresh={() => setIsRefreshing(!isRefreshing)}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={DollarSign} />
                <p className="text-xl">Sell your course</p>
              </div>
              <PriceForm
                initialData={{ price: course?.price || 0 }}
                courseId={course?.id}
                userId={userId}
                onRefresh={() => setIsRefreshing(!isRefreshing)}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <p className="text-xl">Resources & Attachment</p>
              </div>
              <AttachmentForm
                initialData={attachments}
                courseId={course?.id}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
