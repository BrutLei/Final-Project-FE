import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

import axios from "@/services/CustomAxios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

import Editor from "@/components/editor";
import Preview from "@/components/preview";

interface ChapterDescriptionFormProps {
  initialData: {
    description: string | undefined;
  };
  courseId: string | undefined;
  userId: string | undefined;
  chapterId: string | undefined;
  setChange: () => void;
}

const formSchema = z.object({
  description: z.string().min(1),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  userId,
  chapterId,
  setChange,
}: ChapterDescriptionFormProps) => {
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

      toggleEdit();
      toast.success("Chapter updated successfully");
      setChange();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mx-2 h-4 w-4" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {!initialData.description && "No description"}
          {initialData.description && (
            <Preview value={initialData.description || ""} />
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
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

export default ChapterDescriptionForm;
