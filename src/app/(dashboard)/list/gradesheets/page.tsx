import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ViewTable from "@/components/ViewTable";
import FormModal from "@/components/FormModal";
import PaginationBar from "@/components/PaginationBar";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Role } from "@/lib/utils";

type GradesheetList = {
  id: number;
  score: number;
  student: {
    id: string;
    firstname: string;
    lastname: string;
    class: {
      name: string;
    };
  };
  exam?: {
    id: number;
    title: string;
    lesson: {
      subject: {
        name: string;
      };
      teacher: {
        firstname: string;
        lastname: string;
      };
    };
  };
  assignment?: {
    id: number;
    title: string;
    lesson: {
      subject: {
        name: string;
      };
      teacher: {
        firstname: string;
        lastname: string;
      };
    };
  };
};

const GradesheetsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const role = await Role();
  const params = await searchParams;
  const { page, ...queryParams } = params;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.GradesheetWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              {
                student: {
                  OR: [
                    { firstname: { contains: value, mode: "insensitive" } },
                    { lastname: { contains: value, mode: "insensitive" } },
                  ],
                },
              },
              {
                exam: {
                  lesson: {
                    subject: { name: { contains: value, mode: "insensitive" } },
                  },
                },
              },
              {
                assignment: {
                  lesson: {
                    subject: { name: { contains: value, mode: "insensitive" } },
                  },
                },
              },
              {
                exam: {
                  lesson: {
                    teacher: {
                      OR: [
                        { firstname: { contains: value, mode: "insensitive" } },
                        { lastname: { contains: value, mode: "insensitive" } },
                      ],
                    },
                  },
                },
              },
              {
                assignment: {
                  lesson: {
                    teacher: {
                      OR: [
                        { firstname: { contains: value, mode: "insensitive" } },
                        { lastname: { contains: value, mode: "insensitive" } },
                      ],
                    },
                  },
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

  const [gradesheetsData, count] = await prisma.$transaction([
    prisma.gradesheet.findMany({
      where: query,
      include: {
        student: {
          include: {
            class: true,
          },
        },
        exam: {
          include: {
            lesson: {
              include: {
                subject: true,
                teacher: true,
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              include: {
                subject: true,
                teacher: true,
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.gradesheet.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Type",
      accessor: "type",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: GradesheetList) => {
    const subject =
      item.exam?.lesson.subject.name ||
      item.assignment?.lesson.subject.name ||
      "Unknown";
    const teacher =
      item.exam?.lesson.teacher || item.assignment?.lesson.teacher;
    const type = item.exam ? "Exam" : "Assignment";

    return (
      <tr
        key={item.id}
        className="border-b border-b-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
      >
        <td className="flex items-center gap-4 p-4">{subject}</td>
        <td>
          {item.student.firstname} {item.student.lastname}
        </td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">
          {teacher ? `${teacher.firstname} ${teacher.lastname}` : "Unknown"}
        </td>
        <td className="hidden md:table-cell">{item.student.class.name}</td>
        <td className="hidden md:table-cell">{type}</td>
        <td>
          <div className="flex items-center gap-4">
            {role === "admin" && (
              <>
                <FormModal table="gradesheet" type="update" data={item} />
                <FormModal table="gradesheet" type="delete" id={item.id} />
              </>
            )}
            {role === "teacher" && (
              <FormModal table="gradesheet" type="update" data={item} />
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/*TOP*/}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Gradesheets
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/filter.png" alt="filter" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
              <Image src="/sort.png" alt="filter" width={20} height={20} />
            </button>
            {role === "admin" && <FormModal table="gradesheet" type="create" />}
          </div>
        </div>
      </div>
      {/*List*/}
      {gradesheetsData.length > 0 ? (
        <>
          <ViewTable
            columns={columns}
            renderRow={renderRow}
            data={gradesheetsData}
          />
          {/*Pagination*/}
          <PaginationBar page={p} count={count} />
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No gradesheets found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GradesheetsListPage;
