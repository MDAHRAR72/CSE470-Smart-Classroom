import React from "react";
import FormModal from "./FormModal";
import { prisma } from "@/lib/prisma";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "gradesheet"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};
  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, firstname: true, lastname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;

      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;

      default:
        break;
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;
