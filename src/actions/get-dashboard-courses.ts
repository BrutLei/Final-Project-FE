import { Course } from "@/pages/coursesPage/_components/columns";
import { Category } from "@/pages/searchPage/searchPage";

type CoursesWithProgressWithCategoy = Course & {
  category: Category;
  progress: number | null;
};

type DashboardCourses = {
  completedCourse: CoursesWithProgressWithCategoy[];
  coursesInProgress: CoursesWithProgressWithCategoy[];
};

export const getDashboardCourses = (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await;
  } catch (error) {
    console.log("[GET-DASHBOARD-COURSES]", error);
    return {
      completedCourse: [],
      coursesInProgress: [],
    };
  }
};
