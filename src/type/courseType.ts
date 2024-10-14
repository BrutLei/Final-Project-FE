// courseTypes.ts

// Type for Category
export type Category = {
  id: string;
  name: string;
};

// Type for Chapter
export type Chapter = {
  id: string;
};

// Type for Purchase
export type Purchase = {
  id: string;
  userId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
};

// Type for Course
export type Course = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  chapters: Chapter[];
  purchase: Purchase[];
  progress: number;
};

// Type for the Courses Progress Response
export type CoursesWithProgressResponse = {
  completedCourses: Course[];
  inProgressCourses: Course[];
  coursesWithProgress: Course[];
};
