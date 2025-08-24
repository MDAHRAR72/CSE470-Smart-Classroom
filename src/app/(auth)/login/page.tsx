// app/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        console.error("Login failed:", result?.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col justify-between items-center bg-[#C3EBFA] p-4 rounded-xl w-[400px] shadow-2xl">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-4 pb-4"
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="hidden lg:block text-2xl font-bold">
            Smart Classroom
          </span>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputField
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
          <p className="mt-2 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
