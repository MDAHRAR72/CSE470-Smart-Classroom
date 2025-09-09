import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormContainer from "@/components/FormContainer";

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const teacher = await prisma.teacher.findUnique({
    where: { id: resolvedParams.id },
    include: {
      subjects: true,
      classes: true,
      lessons: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });

  if (!teacher) {
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
                src={teacher.img || "/noAvatar.png"}
                alt={`${teacher.firstname} ${teacher.lastname}`}
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              ></Image>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.firstname} {teacher.lastname}
                </h1>
                {role === "admin" && (
                  <FormContainer
                    table="teacher"
                    type="update"
                    data={{
                      id: teacher.id,
                      username: teacher.username,
                      email: teacher.email,
                      firstName: teacher.firstname,
                      lastName: teacher.lastname,
                      phone: teacher.phone,
                      address: teacher.address,
                      bloodType: teacher.bloodType,
                      birthDate: teacher.birthday.toISOString().split("T")[0],
                      sex: teacher.sex.toLowerCase(),
                      img: teacher.img,
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
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email || "No email"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{teacher.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-xs">{teacher.phone || "No phone"}</span>
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
                <h1 className="text-xl font-semibold">
                  {teacher.subjects.length}
                </h1>
                <span className="text-sm text-gray-500">Subjects</span>
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
                <h1 className="text-xl font-semibold">
                  {teacher.lessons.length}
                </h1>
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
                <h1 className="text-xl font-semibold">
                  {teacher.classes.length}
                </h1>
                <span className="text-sm text-gray-500">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/*Bottom*/}
        <div className="mt-4 bg-white rounded-xl p-4 h-[800px]">
          <h1 className="text-lg font-semibold">Teacher&apos;s Schedule</h1>
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
              href={`/list/classes?classTeacherId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-xl bg-purple-100"
              href={`/list/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-3 rounded-xl bg-blue-100"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-xl bg-purple-100"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-xl bg-blue-100"
              href={`/list/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
