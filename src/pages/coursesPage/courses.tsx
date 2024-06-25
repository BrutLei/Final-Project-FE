// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Course, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "@/services/CustomAxios";
import { Button } from "@/components/ui/button";

const CoursePage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const response = await axios.get(`/api/courses/get-courses`, {
      data: { userId },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="p-4">
      <Button className="mb-4" onClick={() => navigate("/teacher/create")}>
        New Course
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursePage;
