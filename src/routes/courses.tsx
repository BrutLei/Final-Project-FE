import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        <Button onClick={() => navigate("/teacher/create")}>New Course</Button>
      </h1>
    </div>
  );
};

export default CoursePage;
