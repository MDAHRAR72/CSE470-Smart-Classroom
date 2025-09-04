import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      class: {
        include: {
          lessons: {
            include: {
              subject: true,
              teacher: true,
            },
          },
        },
      },
      grade: true,
      gradesheet: {
        include: {
          exam: true,
          assignment: true,
        },
      },
    },
  });

  if (!student) {
    notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/*Left*/}
      <div className="w-full xl:w-2/3">
        {/*Top*/}
        <div className="flex flex-col lg:flex-row gap-4">
          {/*User Info Card*/}
          <div className="bg-[#C3EBFA] py-6 px-4 rounded-xl flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt={`${student.firstname} ${student.lastname}`}
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              ></Image>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {student.firstname} {student.lastname}
                </h1>
                {role === "admin" && (
                  <FormModal
                    table="student"
                    type="update"
                    data={{
                      id: student.id,
                      username: student.username,
                      email: student.email,
                      firstName: student.firstname,
                      lastName: student.lastname,
                      phone: student.phone,
                      address: student.address,
                      bloodType: student.bloodType,
                      birthDate: student.birthday.toISOString().split('T')[0],
                      sex: student.sex.toLowerCase(),
                      img: student.img,
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex items-center gap-4 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email || "No email"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{student.birthday.toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-xs">{student.phone || "No phone"}</span>
                </div>
              </div>
            </div>
          </div>
          {/*Side Info Card*/}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/*Card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleattendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-500">Attendance</span>
              </div>
            </div>
            {/*Card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.grade.level}</h1>
                <span className="text-sm text-gray-500">Grade</span>
              </div>
            </div>
            {/*Card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.lessons.length}</h1>
                <span className="text-sm text-gray-500">Lessons</span>
              </div>
            </div>
            {/*Card*/}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-500">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/*Bottom*/}
        <div className="mt-4 bg-white rounded-xl p-4 h-[800px]">
          <h1 className="text-lg font-semibold">Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/*Right*/}
      <div className="w-full xl:w-1/3 flex flex-col gap-4 ">
        <div className="bg-white p-4 rounded-xl">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-xl bg-blue-100"
              href={`/list/lessons?classId=${student.classId}`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-xl bg-purple-100"
              href={`/list/teachers?classId=${student.classId}`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-xl bg-blue-100"
              href={`/list/exams?classId=${student.classId}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-xl bg-purple-100"
              href={`/list/assignments?classId=${student.classId}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-xl bg-blue-100"
              href={`/list/gradesheets?studentId=${student.id}`}
            >
              Student&apos;s Gradesheet
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
