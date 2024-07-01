export interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: {
    id: string;
    name: string;
  };
}

// const CourseCard = ({
//   id,
//   title,
//   imageUrl,
//   chaptersLength,
//   price,
//   progress,
//   category,
// }: CourseCardProps) => {
//   return <div>Course Card</div>;
// };

// export default CourseCard;
