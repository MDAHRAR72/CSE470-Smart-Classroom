"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/UserCard";

const assignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  courseName: z.string().min(1, "Course name is required"),
  assignedBy: z.string().min(1, "Assigned by is required"),
  dueDate: z.string().min(1, "Due date is required"),
  dueTime: z.string().min(1, "Due time is required"),
  maxMarks: z.number().min(0, "Maximum marks cannot be negative"),
  attachments: z.any().optional(),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

interface AssignmentFormProps {
  onSubmit: (data: AssignmentFormValues) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AssignmentForm({
  onSubmit,
  isOpen,
  setIsOpen,
}: AssignmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
  });

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Card Modal */}
      <Card
        className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 
                   transform transition-transform duration-300 scale-100"
      >
        <CardHeader>
          <CardTitle>Add New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data: AssignmentFormValues) => {
              onSubmit(data);
              handleClose();
            })}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Input placeholder="Assignment Title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Input placeholder="Description" {...register("description")} />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Course Name"
                    {...register("courseName")}
                  />
                  {errors.courseName && (
                    <p className="text-sm text-red-500">
                      {errors.courseName.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Assigned By"
                    {...register("assignedBy")}
                  />
                  {errors.assignedBy && (
                    <p className="text-sm text-red-500">
                      {errors.assignedBy.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Input type="date" {...register("dueDate")} />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input type="time" {...register("dueTime")} />
                  {errors.dueTime && (
                    <p className="text-sm text-red-500">
                      {errors.dueTime.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    step="1"
                    min={0}
                    placeholder="Maximum Marks"
                    {...register("maxMarks", { valueAsNumber: true })}
                  />
                  {errors.maxMarks && (
                    <p className="text-sm text-red-500">
                      {errors.maxMarks.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Input type="file" multiple {...register("attachments")} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
