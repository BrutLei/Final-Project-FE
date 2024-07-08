import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "@/services/CustomAxios";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string | undefined;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        userId: user?.id,
        username: user?.fullName,
        email: user?.emailAddresses[0].emailAddress,
      });

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      className="w-full md:w-auto"
      onClick={onClick}
      disabled={isLoading}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
