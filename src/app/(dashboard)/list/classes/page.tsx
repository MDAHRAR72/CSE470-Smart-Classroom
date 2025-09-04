import PaginationBar from "@/components/PaginationBar";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ViewTable from "@/components/ViewTable";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type ClassList = Class & { classTeacher: Teacher };

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Class Teacher",
    accessor: "classTeacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-b-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden md:table-cell">
      {item.classTeacher.firstname + " " + item.classTeacher.lastname}
    </td>
    <td>
      <div className="flex items-center gap-4">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classTeacherId":
            query.classTeacherId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [classesData, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        classTeacher: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/*TOP*/}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/filter.png" alt="filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/sort.png" alt="filter" width={20} height={20} />
            </button>
            {role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>
      {/*List*/}
      <ViewTable columns={columns} renderRow={renderRow} data={classesData} />
      {/*Pagination*/}
      <PaginationBar page={p} count={count} />
    </div>
  );
};

export default ClassesListPage;
