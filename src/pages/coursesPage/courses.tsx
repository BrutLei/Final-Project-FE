// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Course, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "@/services/CustomAxios";

const CoursePage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const [cookies] = useCookies();

  const [data, setData] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const response = await axios.get(`/api/courses/get-courses`, {
      data: { userId },
      headers: { Authorization: cookies.__clerk_db_jwt },
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
    <div className="p-4 ">
      <DataTable columns={columns} data={data} />
      {/* <Button onClick={() => navigate("/teacher/create")}>New Course</Button> */}
    </div>
  );
};

export default CoursePage;
