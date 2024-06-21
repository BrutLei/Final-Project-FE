import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/services/CustomAxios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterTitleFormProps {
  initialData: {
    title: string | undefined;
  };
  courseId: string | undefined;
  chapterId: string | undefined;
  userId: string | undefined;
  setChange: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
  userId,
  setChange,
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log({ userId, ...data });

      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId} `, {
        userId,
        data: data,
      });
      setChange();
      toast.success("Chapter updated successfully");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mx-2 h-4 w-4" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p>{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to Art Course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
