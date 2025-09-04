import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ViewTable from "@/components/ViewTable";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import PaginationBar from "@/components/PaginationBar";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b border-b-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td className="">{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.firstname + " " + item.teacher.lastname}
    </td>
    <td>
      <div className="flex items-center gap-4">
        {role === "admin" && (
          <>
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              {
                teacher: { lastname: { contains: value, mode: "insensitive" } },
              },
              {
                teacher: {
                  firstname: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [lessonsData, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { firstname: true, lastname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/*TOP*/}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/filter.png" alt="filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/sort.png" alt="filter" width={20} height={20} />
            </button>
            {role === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>
      {/*List*/}
      <ViewTable columns={columns} renderRow={renderRow} data={lessonsData} />
      {/*Pagination*/}
      <PaginationBar page={p} count={count} />
    </div>
  );
};

export default LessonsListPage;
