/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import {
  Dispatch,
  JSX,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { deleteSubject, deleteTeacher } from "@/lib/actions";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  teacher: deleteTeacher,
  // class: deleteClass,
  // student: deleteStudent,
  // exam: deleteExam,
};

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  // student: (setOpen, type, data, relatedData) => (
  //   <StudentForm
  //     type={type}
  //     data={data}
  //     setOpen={setOpen}
  //     relatedData={relatedData}
  //   />
  // ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-amber-200"
      : type === "update"
      ? "bg-[#C3EBFA]"
      : "bg-[#CFCEFF]";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useActionState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
      }
    }, [state, type, setOpen]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden></input>
        <span className="text-center font-medium">
          Are you sure you want to delte this?
        </span>
        <button className="bg-red-700 text-white p-4 rounded-xl border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not Created!"
    );
  };
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor} cursor-pointer`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16}></Image>
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black/60  z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl relative w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
