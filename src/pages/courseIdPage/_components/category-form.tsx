import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import axios from "@/services/CustomAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Category is required" }),
});

interface Category {
  label: string;
  value: string;
}
interface Categories extends Array<Category> {}

type CategoryFormProps = {
  initialData: {
    categoryId: string | "";
  };
  userId: string;
  courseId: string;
  options: Categories;
};

const CategoryForm = ({
  initialData,
  userId,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log({ userId, ...data });
      await axios.patch(`/api/courses/${courseId}`, { userId, data: data });
      navigate(0);
      toast.success("Course updated successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      disabled={isSubmitting}
                      {...field}
                      options={options}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" gap-x-2">
              <Button disabled={!isValid} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {initialData.categoryId
            ? options.find((category) => {
                return category.value === initialData.categoryId;
              })?.label
            : "Not set yet"}
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
