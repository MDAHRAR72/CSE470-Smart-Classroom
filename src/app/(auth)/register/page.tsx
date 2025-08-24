"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import Link from "next/link";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthDate: z.string().min(1, { message: "Birth Date is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z
    .any()
    .refine((files) => files?.length === 1, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const RegisterPage = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-between items-center bg-[#C3EBFA] p-6 rounded-xl w-[500px] shadow-2xl">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-4 pb-4"
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="hidden lg:block text-2xl font-bold">
            Smart Classroom
          </span>
        </Link>
        <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          <div className="flex flex-col items-center gap-3">
            <label className="cursor-pointer" htmlFor="img">
              <Image
                src="/avatar.png"
                alt=""
                width={100}
                height={100}
                className="rounded-full border"
              />
            </label>
            <input
              type="file"
              id="img"
              {...register("img")}
              className="hidden"
            />
            {errors.img && (
              <p className="text-xs text-red-400">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
          <div className="flex justify-between flex-wrap gap-4">
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
          <div className="flex justify-between flex-wrap gap-4">
            <InputField
              label="Email"
              name="email"
              defaultValue={data?.email}
              register={register}
              error={errors.email}
            />
            <InputField
              label="Username"
              name="username"
              defaultValue={data?.username}
              register={register}
              error={errors.username}
            />
          </div>
          <div className="flex justify-between flex-wrap gap-4">
            <InputField
              label="Date of Birth"
              type="date"
              name="birthDate"
              defaultValue={data?.birthDate}
              register={register}
              error={errors.birthDate}
            />
            <InputField
              label="Phone"
              name="phone"
              defaultValue={data?.phone}
              register={register}
              error={errors.phone}
            />
          </div>
          <div className="flex justify-between flex-wrap gap-4">
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
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Sex</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-xl text-sm"
              {...register("sex")}
              defaultValue={data?.sex}
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && (
              <p className="text-xs text-red-400">
                {errors.sex.message.toString()}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl "
          >
            Register
          </button>
          <p className="mt-2 text-center text-sm text-gray-500">
            Already Have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
