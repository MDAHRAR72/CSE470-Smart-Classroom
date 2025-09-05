import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ViewTable from "@/components/ViewTable";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import PaginationBar from "@/components/PaginationBar";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type AnnouncementList = {
  id: number;
  title: string;
  description: string;
  date: Date;
  class?: {
    id: number;
    name: string;
  } | null;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-b-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="hidden md:table-cell">
      {item.class?.name || "All Classes"}
    </td>
    <td>{new Intl.DateTimeFormat("en-US").format(item.date)}</td>
    <td>
      <div className="flex items-center gap-4">
        {role === "admin" && (
          <>
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AnnouncementsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "search":
            query.OR = [
              { title: { contains: value, mode: "insensitive" } },
              { description: { contains: value, mode: "insensitive" } },
              {
                class: {
                  name: { contains: value, mode: "insensitive" },
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

  const [announcementsData, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: {
        date: "desc",
      },
    }),
    prisma.announcement.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-2xl flex-1 m-4 mt-0">
      {/*TOP*/}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
            {role === "admin" && (
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      {/*List*/}
      {announcementsData.length > 0 ? (
        <>
          <ViewTable
            columns={columns}
            renderRow={renderRow}
            data={announcementsData}
          />
          {/*Pagination*/}
          <PaginationBar page={p} count={count} />
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No announcements found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsListPage;
