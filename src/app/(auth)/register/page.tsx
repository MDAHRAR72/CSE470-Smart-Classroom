"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

const registerSchema = z.object({
  fname: z.string().min(2, "First name required"),
  lname: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (_data: RegisterForm) => {
    // TODO: Hook up to registration API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputField placeholder="First Name" {...register("fname")} />
            {errors.fname && (
              <p className="text-sm text-red-500">{errors.fname.message}</p>
            )}
          </div>
          <div>
            <InputField placeholder="Last Name" {...register("lname")} />
            {errors.lname && (
              <p className="text-sm text-red-500">{errors.lname.message}</p>
            )}
          </div>
          <div>
            <InputField placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <InputField
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <p className="mt-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
