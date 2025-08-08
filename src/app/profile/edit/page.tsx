"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { BurgerMenu } from "@/components/BurgerMenu";
import { useEffect, useState } from "react";
import Image from "next/image";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  studentId: z.string().min(3, "Student ID is required"),
  major: z.string().min(2, "Major is required"),
  year: z.number().min(1).max(8),
  semester: z.string().min(2, "Semester is required"),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  phone: z.string().min(7, "Phone is required"),
  address: z.string().min(3, "Address is required"),
  gpa: z.number().min(0).max(4),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      studentId: "22301327",
      major: "Computer Science & Engineering",
      year: 3,
      semester: "Summer 2025",
      dateOfBirth: "2002-01-01",
      phone: "+8801712345678",
      address: "123 Main St, Springfield",
      gpa: 3.75,
      avatarUrl: "/avatar.jpg",
    },
  });

  useEffect(() => {
    if (session?.user) {
      const full = session.user.name || "";
      const parts = full.trim().split(/\s+/);
      const first = parts[0] || "";
      const last = parts.slice(1).join(" ") || "";
      setValue("firstName", first);
      setValue("lastName", last);
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

  const [avatarPreview, setAvatarPreview] = useState<string>("/avatar.jpg");

  const onSubmit = (_data: ProfileFormValues) => {
    // Here you would send data to your backend
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Access denied. Please log in.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <BurgerMenu />
        </div>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Edit Profile</CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/dashboard")}
              title="Go to Dashboard"
            >
              <Home className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 mb-4">
              <Image
                src={avatarPreview || "/avatar.jpg"}
                alt="Profile picture"
                width={96}
                height={96}
                className="rounded-full object-cover border"
                unoptimized
              />
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = reader.result as string;
                      setAvatarPreview(result);
                      setValue("avatarUrl", result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">First Name</label>
                  <Input {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Last Name</label>
                  <Input {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Email</label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Student ID</label>
                  <Input {...register("studentId")} />
                  {errors.studentId && (
                    <p className="text-sm text-red-500">{errors.studentId.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Date of Birth</label>
                  <Input type="date" {...register("dateOfBirth")} />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Phone</label>
                  <Input {...register("phone")} />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Major</label>
                  <Input {...register("major")} />
                  {errors.major && (
                    <p className="text-sm text-red-500">{errors.major.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Semester</label>
                  <Input {...register("semester")} />
                  {errors.semester && (
                    <p className="text-sm text-red-500">{errors.semester.message}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">Year</label>
                  <Input type="number" min={1} max={8} {...register("year", { valueAsNumber: true })} />
                  {errors.year && (
                    <p className="text-sm text-red-500">{errors.year.message as string}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-1 font-medium">CGPA</label>
                  <Input type="number" step="0.01" min={0} max={4} {...register("gpa", { valueAsNumber: true })} />
                  {errors.gpa && (
                    <p className="text-sm text-red-500">{errors.gpa.message as string}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Address</label>
                  <Input {...register("address")} />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">Save Changes</Button>
              {success && (
                <p className="text-green-600 text-center mt-2">Profile updated!</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
