import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ViewTable from "@/components/ViewTable";
import Link from "next/link";
import { announcementsData, role } from "@/lib/data";

type Announcement = {
  id: number;
  title: string;
  class: number;
  date: string;
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
    accessor: "Date",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AnnouncementsListPage = () => {
  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-b-gray-200 even:bg-slate-50 text-sm hover:bg-blue-50"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td>{item.date}</td>
      <td>
        <div className="flex items-center gap-4">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA] cursor-pointer">
              <Image src="/edit.png" alt="" width={16} height={16}></Image>
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF] cursor-pointer">
              <Image src="/delete.png" alt="" width={16} height={16}></Image>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
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
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-200 cursor-pointer">
                <Image src="/plus.png" alt="filter" width={20} height={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/*List*/}
      <ViewTable
        columns={columns}
        renderRow={renderRow}
        data={announcementsData}
      />
      {/*Pagination*/}
      <Pagination />
    </div>
  );
};

export default AnnouncementsListPage;
