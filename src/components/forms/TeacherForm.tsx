"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchema";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/lib/actions";

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    startTransition(() => {
      formAction(data);
    });
  });

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const { subjects } = relatedData;

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Teacher" : "Update Teacher"}
      </h1>
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        {/* <label
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
          htmlFor="img"
        >
          <Image
            src="/avatar.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full cursor-pointer border-3"
          />
        </label>
        <input type="file" id="img" {...register("img")} className="hidden" />
        {errors.img?.message && (
          <p className="text-xs text-red-400">
            {errors.img.message.toString()}
          </p>
        )}
        <label
          className="w-1/3 text-xs text-gray-500 flex justify-center items-center gap-2 pl-2 pr-2 border-1 rounded-lg cursor-pointer"
          htmlFor="img"
        >
          <Image src="/upload.png" alt="" width={28} height={28} />
          <span>Upload a photo</span>
        </label>
        <input type="file" id="img" {...register("img")} className="hidden" />
        {errors.img?.message && (
          <p className="text-xs text-red-400">
            {errors.img.message.toString()}
          </p>
        )} */}
      </div>
      <div className="flex flex-row justify-between pl-4 pr-4 gap-3">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
      </div>
      <div className="flex flex-row justify-between pl-4 pr-4 gap-3">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
      </div>
      <div className="flex flex-row justify-between pl-4 pr-4 gap-3">
        <InputField
          label="Date of Birth"
          name="birthDate"
          defaultValue={data?.birthDate}
          register={register}
          error={errors.birthDate}
          type="date"
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
      </div>

      <div className="flex flex-row justify-between pl-4 pr-4 gap-3">
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
      </div>
      <div className="flex flex-row justify-between pl-4 pr-4 gap-3">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
