import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "@/services/CustomAxios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { IChapters } from "../courseIdPage";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapter-list";

interface ChapterFormProps {
  initialData: {
    chapters: IChapters | null;
  };
  courseId: string | undefined;
  userId: string | undefined;
  onRefresh: () => void;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterForm = ({
  initialData,
  courseId,
  userId,
  onRefresh,
}: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, {
        userId,
        title: data.title,
      });
      toast.success("Chapter created successfully");
      toggleCreating();
      onRefresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onReorder = async (
    updateData: { id: string | undefined; position: number }[]
  ) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        userId,
        chapters: updateData,
      });
      onRefresh();
      toast.success("Chapters reordered successfully");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const location = useLocation();
  const onEdit = (id: string) => {
    navigate(`${location.pathname}/chapter/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute w-full h-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader className="animate-spin h-8 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mx-2 h-4 w-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
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
                      placeholder="e.g. 'Introduction to...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters?.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters?.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
