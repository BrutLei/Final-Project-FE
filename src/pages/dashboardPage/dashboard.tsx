import { CoursesWithProgressResponse } from "@/type/courseType";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "@/services/CustomAxios";
import { Navigate } from "react-router-dom";
import { CoursesList } from "@/components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_component/info-card";

export default function Dashboard() {
  const { isSignedIn, isLoaded, userId } = useAuth();

  // const navigate = useNavigate();

  const [data, setData] = useState<CoursesWithProgressResponse>();

  const fetchDashboardCourses = async () => {
    const response = await axios.get(`/api/courses/dashboard/${userId}`);
    setData(response.data);
  };

  useEffect(() => {
    fetchDashboardCourses();
  }, [data]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  if (!data) {
    return <div>No courses Found</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={data.inProgressCourses.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={data.completedCourses.length}
          variant="success"
        />
      </div>
      {data && <CoursesList items={data.coursesWithProgress} />}
    </div>
  );
}
